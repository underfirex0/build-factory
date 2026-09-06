import Link from 'next/link';
import { DEAL_STAGES } from '@/lib/schema';
import { mockDeals } from '@/lib/mock-data';
import { Panel, SectionLabel } from '@/components/ui/primitives';

export default function PipelinePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Pipeline</h1>
        <p className="text-sm text-base-400 mt-1">
          Every deal's real stage — driven by activation status and rep updates, not inferred from a WhatsApp thread.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {DEAL_STAGES.map((stage) => {
          const deals = mockDeals.filter((d) => d.stage === stage.value);
          return (
            <div key={stage.value} className="w-64 shrink-0">
              <div className="flex items-center justify-between mb-2 px-1">
                <SectionLabel>{stage.label}</SectionLabel>
                <span className="text-xs text-base-500 font-mono">{deals.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {deals.map((d) => (
                  <Link key={d.id} href={`/leads/${d.companyId}`}>
                    <Panel className="p-3 hover:border-base-500 transition-colors cursor-pointer">
                      <div className="text-sm text-base-100">{d.companyName}</div>
                      <div className="text-xs text-base-400 mt-0.5">{d.companyCity}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-base-500">{d.ownerName ?? 'Unassigned'}</span>
                        {d.value && (
                          <span className="text-[11px] font-mono text-ok">{d.value.toLocaleString()} MAD</span>
                        )}
                      </div>
                    </Panel>
                  </Link>
                ))}
                {deals.length === 0 && (
                  <div className="text-xs text-base-600 border border-dashed border-base-800 px-3 py-4 text-center">
                    Empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
