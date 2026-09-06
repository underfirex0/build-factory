export const dynamic = 'force-dynamic';

import { getDealByCompanyId, getSiteById, getActivities } from '@/lib/db';
import { Panel, SectionLabel, StageBadge, StatusDot } from '@/components/ui/primitives';
import { ActivationPanel } from '@/components/leads/ActivationPanel';
import { notFound } from 'next/navigation';

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const deal = await getDealByCompanyId(params.id);
  if (!deal) notFound();
  const [site, activities] = await Promise.all([
    deal.siteId ? getSiteById(deal.siteId) : Promise.resolve(null),
    getActivities(deal.id),
  ]);

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">{deal.companyName}</h1>
          <p className="text-sm text-base-400 mt-1">{deal.companyCity} · owned by {deal.ownerName ?? 'unassigned'}</p>
        </div>
        <StageBadge stage={deal.stage} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <Panel>
            <div className="px-4 py-3 border-b border-base-700 flex items-center justify-between">
              <SectionLabel>Site</SectionLabel>
              {site && (
                <a
                  href={`https://${site.customDomain ?? `${site.slug}.yako.studio`}`}
                  className="text-xs text-steel hover:underline font-mono"
                >
                  {site.customDomain ?? `${site.slug}.yako.studio`} ↗
                </a>
              )}
            </div>
            {site ? (
              <div className="p-4 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <StatusDot status={site.status} />
                  <span className="text-base-100 capitalize">{site.status}</span>
                  <span className="text-base-500 ml-3">{site.templateName}</span>
                </div>
                <span className="text-xs text-base-500 font-mono">{site.viewCount} views</span>
              </div>
            ) : (
              <div className="p-4 text-sm text-base-500">No demo built yet.</div>
            )}
          </Panel>

          <Panel>
            <div className="px-4 py-3 border-b border-base-700">
              <SectionLabel>Activity timeline</SectionLabel>
            </div>
            <div className="p-4 flex flex-col gap-3 text-sm">
              {activities.length > 0 ? (
                activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[11px] font-mono text-base-500 w-20 shrink-0 pt-0.5">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-base-500 border border-base-700 px-1.5 py-0.5 shrink-0">
                      {a.channel}
                    </span>
                    <span className="text-base-200">{a.content}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-base-500">
                  No logged activity yet — connect Supabase to start recording payments and content intake here.
                </p>
              )}
            </div>
          </Panel>
        </div>

        <ActivationPanel dealId={deal.id} companyId={deal.companyId} siteId={site?.id} />
      </div>
    </div>
  );
}
