export const dynamic = 'force-dynamic';

import { getDeals, getTemplates } from '@/lib/db';
import { BulkBuildForm } from '@/components/builds/BulkBuildForm';

export default async function BuildsPage() {
  const [deals, templates] = await Promise.all([getDeals(), getTemplates()]);
  const unbuilt = deals.filter((d) => d.stage === 'scraped');

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Bulk Build</h1>
        <p className="text-sm text-base-400 mt-1">
          Assign one template to many leads and build every demo in one job — this is a row insert per lead, not a redeploy.
        </p>
      </div>
      <BulkBuildForm unbuilt={unbuilt} templates={templates} />
    </div>
  );
}
