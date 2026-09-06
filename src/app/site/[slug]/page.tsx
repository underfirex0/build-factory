import { notFound } from 'next/navigation';
import { getSiteContentBySlug } from '@/lib/db';
import { EliteRestaurantTemplate } from '@/templates/elite-restaurant/Template';

const TEMPLATE_REGISTRY: Record<string, React.ComponentType<{ content: any }>> = {
  'elite-restaurant': EliteRestaurantTemplate,
};

// This one route serves every business on this template — middleware.ts
// rewrites `businessname.yako.studio/*` here. Bulk-building 500 sites means
// 500 rows resolvable by this lookup, not 500 deployments.
export default async function SitePage({ params }: { params: { slug: string } }) {
  const result = await getSiteContentBySlug(params.slug);
  if (!result) notFound();

  const Template = TEMPLATE_REGISTRY[result.templateSlug];
  if (!Template) notFound();

  return <Template content={result.content} />;
}
