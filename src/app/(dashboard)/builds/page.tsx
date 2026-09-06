'use client';

import { useState } from 'react';
import { mockDeals, mockTemplates } from '@/lib/mock-data';
import { Panel, SectionLabel, Button } from '@/components/ui/primitives';

export default function BuildsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [templateId, setTemplateId] = useState(mockTemplates[0].id);
  const unbuilt = mockDeals.filter((d) => d.stage === 'scraped');

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Bulk Build</h1>
        <p className="text-sm text-base-400 mt-1">
          Assign one template to many leads and build every demo in one job — this is a row insert per lead, not a redeploy.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel className="col-span-2">
          <div className="px-4 py-3 border-b border-base-700 flex items-center justify-between">
            <SectionLabel>Leads without a demo yet</SectionLabel>
            <span className="text-xs text-base-500 font-mono">{selected.size} selected</span>
          </div>
          <div>
            {unbuilt.map((d) => (
              <label
                key={d.id}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-base-800 last:border-0 text-sm cursor-pointer hover:bg-base-800/40"
              >
                <input
                  type="checkbox"
                  checked={selected.has(d.id)}
                  onChange={() => toggle(d.id)}
                  className="accent-signal"
                />
                <div className="flex-1">
                  <span className="text-base-100">{d.companyName}</span>
                  <span className="text-base-500 ml-2 text-xs">{d.companyCity}</span>
                </div>
              </label>
            ))}
            {unbuilt.length === 0 && (
              <div className="px-4 py-6 text-sm text-base-500 text-center">No unbuild leads right now.</div>
            )}
          </div>
        </Panel>

        <Panel className="p-4">
          <SectionLabel>Template</SectionLabel>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="w-full bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm mb-4 focus:outline-none focus:border-signal"
          >
            {mockTemplates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <p className="text-xs text-base-400 mb-4">
            All {selected.size} selected lead{selected.size === 1 ? '' : 's'} will get a demo site on this template, on the shared subdomain, with placeholder imagery.
          </p>
          <Button className="w-full justify-center" disabled={selected.size === 0}>
            Build {selected.size || ''} demo{selected.size === 1 ? '' : 's'}
          </Button>
        </Panel>
      </div>
    </div>
  );
}
