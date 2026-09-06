import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createServiceClient } from '@/lib/supabase/server';

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
  } catch (e: any) {
    report.thrownError = e.message;
  }

  return NextResponse.json(report);
}