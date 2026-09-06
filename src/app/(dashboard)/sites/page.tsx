import { mockSites } from '@/lib/mock-data';
import { Panel, StatusDot } from '@/components/ui/primitives';

export default function SitesPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Sites</h1>
        <p className="text-sm text-base-400 mt-1">Every deployed business — rendering is multi-tenant, this is just the registry.</p>
      </div>

      <Panel>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-base-700 text-left text-base-400">
              <th className="font-normal px-4 py-2.5">Business</th>
              <th className="font-normal px-4 py-2.5">Domain</th>
              <th className="font-normal px-4 py-2.5">Template</th>
              <th className="font-normal px-4 py-2.5">Status</th>
              <th className="font-normal px-4 py-2.5">Views</th>
            </tr>
          </thead>
          <tbody>
            {mockSites.map((s) => (
              <tr key={s.id} className="border-b border-base-800 last:border-0 hover:bg-base-800/40">
                <td className="px-4 py-2.5 text-base-100">{s.companyName}</td>
                <td className="px-4 py-2.5 text-base-300 font-mono text-xs">
                  {s.customDomain ?? `${s.slug}.yako.studio`}
                </td>
                <td className="px-4 py-2.5 text-base-300">{s.templateName}</td>
                <td className="px-4 py-2.5">
                  <span className="flex items-center capitalize">
                    <StatusDot status={s.status} />
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-base-400">{s.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
