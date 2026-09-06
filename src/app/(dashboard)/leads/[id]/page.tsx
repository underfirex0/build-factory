import { mockDeals, mockSites } from '@/lib/mock-data';
import { Panel, SectionLabel, StageBadge, StatusDot, Button } from '@/components/ui/primitives';
import { notFound } from 'next/navigation';

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const deal = mockDeals.find((d) => d.companyId === params.id);
  if (!deal) notFound();
  const site = mockSites.find((s) => s.id === deal.siteId);

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
              <TimelineItem channel="system" text="Lead scraped from Google Maps" time="Aug 30" />
              <TimelineItem channel="system" text={`Demo built on ${site?.templateName ?? 'template'}`} time="Sep 1" />
              <TimelineItem channel="whatsapp" text="Demo link sent" time="Sep 2" />
              {deal.lastActivityAt && (
                <TimelineItem channel="whatsapp" text="Last touchpoint" time={deal.lastActivityAt} />
              )}
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-4">
          <Panel className="p-4">
            <SectionLabel>Activate this site</SectionLabel>
            <p className="text-xs text-base-400 mb-3">
              Log the deal once the rep closes it over WhatsApp/call — this is what turns a demo into a live paid site.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <LabeledInput label="Amount (MAD)" placeholder="6000" />
              <LabeledInput label="Payment method" placeholder="Cash / transfer" />
              <LabeledSelect label="Domain" options={['Keep subdomain', 'Custom domain']} />
              <Button className="mt-2 w-full justify-center">Log payment</Button>
            </div>
          </Panel>

          <Panel className="p-4">
            <SectionLabel>Content intake</SectionLabel>
            <p className="text-xs text-base-400 mb-3">
              Generates a no-login upload link to send the client so they can drop their real photos.
            </p>
            <Button variant="secondary" className="w-full justify-center">Generate upload link</Button>
          </Panel>

          <Panel className="p-4">
            <SectionLabel>Publish</SectionLabel>
            <p className="text-xs text-base-400 mb-3">
              Swaps placeholder images for real ones and removes the demo banner. Requires payment logged and content received.
            </p>
            <Button variant="secondary" className="w-full justify-center" disabled>
              Waiting on content
            </Button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ channel, text, time }: { channel: string; text: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[11px] font-mono text-base-500 w-14 shrink-0 pt-0.5">{time}</span>
      <span className="text-[10px] uppercase tracking-wide text-base-500 border border-base-700 px-1.5 py-0.5 shrink-0">
        {channel}
      </span>
      <span className="text-base-200">{text}</span>
    </div>
  );
}

function LabeledInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-base-400">{label}</span>
      <input
        placeholder={placeholder}
        className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal"
      />
    </label>
  );
}

function LabeledSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-base-400">{label}</span>
      <select className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
