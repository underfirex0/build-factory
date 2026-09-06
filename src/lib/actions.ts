'use server';

import { revalidatePath } from 'next/cache';
import { isSupabaseConfigured } from './supabase/config';
import { createServiceClient } from './supabase/server';

/** Thrown by every action below in mock mode — there's nothing to write to
 *  yet, and pretending otherwise would just hide that from the person clicking
 *  the button. Pages catch this and show it plainly. */
class NotConnectedError extends Error {
  constructor() {
    super('Connect a Supabase project to enable this — see .env.example.');
  }
}

export async function logPayment(
  dealId: string,
  amount: number,
  paymentMethod: string,
  domainChoice: 'subdomain' | 'custom',
) {
  if (!isSupabaseConfigured) throw new NotConnectedError();

  const supabase = createServiceClient();
  const paidAt = new Date().toISOString();

  const { error: dealError } = await supabase
    .from('deals')
    .update({ stage: 'paid', value: amount, payment_method: paymentMethod, paid_at: paidAt })
    .eq('id', dealId);
  if (dealError) throw new Error(`logPayment (deal): ${dealError.message}`);

  const { error: invoiceError } = await supabase
    .from('invoices')
    .insert({ deal_id: dealId, amount, status: 'paid', paid_at: paidAt });
  if (invoiceError) throw new Error(`logPayment (invoice): ${invoiceError.message}`);

  await supabase.from('activities').insert({
    deal_id: dealId,
    channel: 'system',
    content: `Payment logged: ${amount} MAD via ${paymentMethod}. Domain: ${domainChoice === 'custom' ? 'custom domain requested' : 'keeping subdomain'}.`,
  });

  revalidatePath('/leads');
  revalidatePath('/pipeline');
}

export async function generateUploadLink(dealId: string, companyId: string): Promise<string> {
  if (!isSupabaseConfigured) throw new NotConnectedError();

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('upload_tokens')
    .insert({ deal_id: dealId, company_id: companyId })
    .select('token')
    .single();
  if (error) throw new Error(`generateUploadLink: ${error.message}`);

  await supabase.from('activities').insert({
    deal_id: dealId,
    channel: 'system',
    content: 'Content upload link generated and ready to send.',
  });

  const base = process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ? `https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : ''; // relative link is fine before a root domain is configured
  return `${base}/upload/${data.token}`;
}

export async function publishSite(siteId: string) {
  if (!isSupabaseConfigured) throw new NotConnectedError();

  const supabase = createServiceClient();
  const { error } = await supabase
    .from('sites')
    .update({ status: 'active', activated_at: new Date().toISOString() })
    .eq('id', siteId);
  if (error) throw new Error(`publishSite: ${error.message}`);

  const { data: site } = await supabase.from('sites').select('company_id').eq('id', siteId).single();
  if (site) {
    await supabase
      .from('deals')
      .update({ stage: 'activated' })
      .eq('company_id', site.company_id);
  }

  revalidatePath('/sites');
  revalidatePath('/pipeline');
}

/** The core bulk-build action: one template assigned to many leads in one
 *  job — a row insert per lead, never a redeploy. */
export async function buildDemos(companyIds: string[], templateId: string) {
  if (!isSupabaseConfigured) throw new NotConnectedError();
  if (companyIds.length === 0) return;

  const supabase = createServiceClient();

  const { data: job, error: jobError } = await supabase
    .from('build_jobs')
    .insert({ template_id: templateId, status: 'running', total_count: companyIds.length })
    .select('id')
    .single();
  if (jobError) throw new Error(`buildDemos (job): ${jobError.message}`);

  let successCount = 0;
  let failedCount = 0;

  for (const companyId of companyIds) {
    const { data: company } = await supabase
      .from('companies')
      .select('name')
      .eq('id', companyId)
      .single();

    const slug = (company?.name ?? companyId)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data: site, error: siteError } = await supabase
      .from('sites')
      .insert({ company_id: companyId, template_id: templateId, slug, status: 'demo' })
      .select('id')
      .single();

    if (siteError) {
      failedCount++;
      await supabase.from('build_job_items').insert({
        build_job_id: job.id,
        company_id: companyId,
        status: 'failed',
        error: siteError.message,
      });
      continue;
    }

    successCount++;
    await supabase.from('build_job_items').insert({
      build_job_id: job.id,
      company_id: companyId,
      site_id: site.id,
      status: 'success',
    });

    await supabase.from('deals').update({ stage: 'demo_built' }).eq('company_id', companyId);
  }

  await supabase
    .from('build_jobs')
    .update({ status: 'completed', success_count: successCount, failed_count: failedCount, completed_at: new Date().toISOString() })
    .eq('id', job.id);

  revalidatePath('/builds');
  revalidatePath('/sites');
  revalidatePath('/pipeline');
  revalidatePath('/leads');
}
