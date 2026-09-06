import Link from 'next/link';
import { mockDeals } from '@/lib/mock-data';
import { Panel, StageBadge, Button } from '@/components/ui/primitives';

export default function LeadsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Leads</h1>
          <p className="text-sm text-base-400 mt-1">Every scraped business, one row each.</p>
        </div>
        <Button variant="secondary">Import from scraper</Button>
      </div>

      <Panel>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-base-700 text-left text-base-400">
              <th className="font-normal px-4 py-2.5">Business</th>
              <th className="font-normal px-4 py-2.5">City</th>
              <th className="font-normal px-4 py-2.5">Owner</th>
              <th className="font-normal px-4 py-2.5">Stage</th>
              <th className="font-normal px-4 py-2.5">Last activity</th>
              <th className="font-normal px-4 py-2.5">Value</th>
            </tr>
          </thead>
          <tbody>
            {mockDeals.map((d) => (
              <tr key={d.id} className="border-b border-base-800 last:border-0 hover:bg-base-800/40">
                <td className="px-4 py-2.5">
                  <Link href={`/leads/${d.companyId}`} className="text-base-100 hover:text-signal">
                    {d.companyName}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-base-300">{d.companyCity}</td>
                <td className="px-4 py-2.5 text-base-300">{d.ownerName ?? '—'}</td>
                <td className="px-4 py-2.5"><StageBadge stage={d.stage} /></td>
                <td className="px-4 py-2.5 text-base-500 font-mono text-xs">{d.lastActivityAt ?? '—'}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-ok">
                  {d.value ? `${d.value.toLocaleString()} MAD` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
