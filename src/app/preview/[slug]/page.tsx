import { EliteRestaurantTemplate } from '@/templates/elite-restaurant/Template';
import { mockActiveContent, mockDemoContent } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

// Maps template slug -> component. Add an entry here each time a new
// template is dropped into /src/templates/<slug>.
const TEMPLATE_REGISTRY: Record<string, React.ComponentType<{ content: any }>> = {
  'elite-restaurant': EliteRestaurantTemplate,
};

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { state?: string };
}) {
  const Template = TEMPLATE_REGISTRY[params.slug];
  if (!Template) notFound();

  const content = searchParams.state === 'active' ? mockActiveContent : mockDemoContent;
  return <Template content={content} />;
}
