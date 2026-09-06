import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createServiceClient } from '@/lib/supabase/server';
import { getDeals } from '@/lib/db';

// TEMPORARY — delete this route once the connection issue is diagnosed.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
  const report: Record<string, unknown> = {
    isSupabaseConfigured,
    supabaseUrlHost: url ? new URL(url).host : null,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    serviceRoleKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length ?? 0,
  };

  if (!isSupabaseConfigured) {
    report.result = 'Not configured — would be running in mock mode.';
    return NextResponse.json(report);
  }

  try {
    const supabase = createServiceClient();
    const { count, error } = await supabase.from('deals').select('*', { count: 'exact', head: true });
    report.dealsCount = count;
    report.dealsError = error?.message ?? null;

    const { data: sample, error: sampleError } = await supabase.from('deals').select('id, stage').limit(3);
    report.sampleRows = sample;
    report.sampleError = sampleError?.message ?? null;

    const { data: joined, error: joinedError } = await supabase
      .from('deals')
      .select('id, stage, value, updated_at, companies(id, name, city), app_users(full_name)')
      .order('updated_at', { ascending: false });
    report.joinedCount = joined?.length ?? 0;
    report.joinedError = joinedError?.message ?? null;
    report.joinedSample = joined?.slice(0, 2) ?? null;

    const realDeals = await getDeals();
    report.getDealsCount = realDeals.length;
    report.getDealsSample = realDeals.slice(0, 2);
  } catch (e: any) {
    report.thrownError = e.message;
  }

  return NextResponse.json(report);
}