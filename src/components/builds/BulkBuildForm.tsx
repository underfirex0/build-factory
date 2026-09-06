'use client';

import { useState, useTransition } from 'react';
import { buildDemos } from '@/lib/actions';
import { Panel, SectionLabel, Button } from '@/components/ui/primitives';
import type { Deal, Template } from '@/lib/schema';

export function BulkBuildForm({ unbuilt, templates }: { unbuilt: Deal[]; templates: Template[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? '');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggle(companyId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(companyId) ? next.delete(companyId) : next.add(companyId);
      return next;
    });
  }

  function handleBuild() {
    setError(null);
    setDone(null);
    startTransition(async () => {
      try {
        await buildDemos(Array.from(selected), templateId);
        setDone(selected.size);
        setSelected(new Set());
      } catch (e: any) {
        setError(e.message);
      }
    });
  }

  return (
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
                checked={selected.has(d.companyId)}
                onChange={() => toggle(d.companyId)}
                className="accent-signal"
              />
              <div className="flex-1">
                <span className="text-base-100">{d.companyName}</span>
                <span className="text-base-500 ml-2 text-xs">{d.companyCity}</span>
              </div>
            </label>
          ))}
          {unbuilt.length === 0 && (
            <div className="px-4 py-6 text-sm text-base-500 text-center">No unbuilt leads right now.</div>
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
          {templates.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <p className="text-xs text-base-400 mb-4">
          All {selected.size} selected lead{selected.size === 1 ? '' : 's'} will get a demo site on this template, on the shared subdomain, with placeholder imagery.
        </p>
        {error && <p className="text-xs text-danger mb-3">{error}</p>}
        {done !== null && <p className="text-xs text-ok mb-3">Built {done} demo{done === 1 ? '' : 's'}.</p>}
        <Button
          onClick={handleBuild}
          disabled={selected.size === 0 || isPending || !templateId}
          className="w-full justify-center"
        >
          {isPending ? 'Building…' : `Build ${selected.size || ''} demo${selected.size === 1 ? '' : 's'}`}
        </Button>
      </Panel>
    </div>
  );
}
