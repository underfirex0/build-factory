import { mockDeals, mockSites } from '@/lib/mock-data';
import { Panel, SectionLabel, StatCard, StageBadge, StatusDot } from '@/components/ui/primitives';

export default function DashboardPage() {
  const totalDeals = mockDeals.length;
  const activated = mockDeals.filter((d) => d.stage === 'activated').length;
  const revenue = mockDeals.reduce((sum, d) => sum + (d.value ?? 0), 0);
  const demoViews = mockSites.reduce((sum, s) => sum + s.viewCount, 0);

  const recentActivity = [...mockDeals]
    .filter((d) => d.lastActivityAt)
    .sort((a, b) => (b.lastActivityAt! > a.lastActivityAt! ? 1 : -1))
    .slice(0, 6);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-base-400 mt-1">Pipeline health and build activity, at a glance.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <StatCard label="Deals in pipeline" value={String(totalDeals)} />
        <StatCard label="Activated" value={String(activated)} sub={`of ${totalDeals} total`} />
        <StatCard label="Revenue booked" value={`${revenue.toLocaleString()} MAD`} />
        <StatCard label="Demo views (all-time)" value={String(demoViews)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Panel>
          <div className="px-4 py-3 border-b border-base-700">
            <SectionLabel>Recent activity</SectionLabel>
          </div>
          <div>
            {recentActivity.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between px-4 py-2.5 border-b border-base-800 last:border-0 text-sm"
              >
                <div>
                  <div className="text-base-100">{d.companyName}</div>
                  <div className="text-xs text-base-400">{d.companyCity} · {d.ownerName ?? 'unassigned'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-base-500 font-mono">{d.lastActivityAt}</span>
                  <StageBadge stage={d.stage} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="px-4 py-3 border-b border-base-700">
            <SectionLabel>Live sites</SectionLabel>
          </div>
          <div>
            {mockSites.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-4 py-2.5 border-b border-base-800 last:border-0 text-sm"
              >
                <div className="flex items-center">
                  <StatusDot status={s.status} />
                  <div>
                    <div className="text-base-100">{s.companyName}</div>
                    <div className="text-xs text-base-400 font-mono">{s.customDomain ?? `${s.slug}.yako.studio`}</div>
                  </div>
                </div>
                <span className="text-xs text-base-500 font-mono">{s.viewCount} views</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
