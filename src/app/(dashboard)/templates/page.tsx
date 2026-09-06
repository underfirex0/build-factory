export const dynamic = 'force-dynamic';

import { getTemplates } from '@/lib/db';
import { Panel, SectionLabel, Button } from '@/components/ui/primitives';

const tierColor: Record<string, string> = {
  elite: 'text-signal border-signal/40',
  pro: 'text-steel border-steel/40',
  starter: 'text-base-400 border-base-600',
};

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Templates</h1>
          <p className="text-sm text-base-400 mt-1">Versioned, multi-tenant — updating one updates every site on it.</p>
        </div>
        <Button variant="secondary">Add template</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {templates.map((t) => (
          <Panel key={t.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] uppercase px-1.5 py-0.5 border font-mono ${tierColor[t.tier]}`}>
                {t.tier}
              </span>
              <span className="text-xs text-base-500 font-mono">v{t.version}</span>
            </div>
            <div className="text-sm text-base-100 mb-1">{t.name}</div>
            <div className="text-xs text-base-400 mb-4">{t.vertical}</div>
            <div className="flex gap-2">
              <a href={`/preview/${t.slug}?state=demo`} target="_blank" className="text-xs text-steel hover:underline">
                Preview demo
              </a>
              <span className="text-base-700">·</span>
              <a href={`/preview/${t.slug}?state=active`} target="_blank" className="text-xs text-steel hover:underline">
                Preview active
              </a>
            </div>
          </Panel>
        ))}
      </div>

      <div className="mt-6">
        <SectionLabel>Adding a new template</SectionLabel>
        <p className="text-xs text-base-500 max-w-xl">
          Use buildfactory-template-brief.md to brief the build in any AI tool, then drop the resulting
          component set into /src/templates/&lt;slug&gt; — it becomes available here automatically.
        </p>
      </div>
    </div>
  );
}
