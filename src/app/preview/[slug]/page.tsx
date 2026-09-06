import { EliteRestaurantTemplate } from '@/templates/elite-restaurant/Template';
import { ProDentalTemplate } from '@/templates/pro-dental/Template';
import {
  mockActiveContent,
  mockDemoContent,
  mockDentalActiveContent,
  mockDentalDemoContent,
} from '@/lib/mock-data';
import { notFound } from 'next/navigation';

// Maps template slug -> component + its demo/active preview fixtures.
// Add an entry here each time a new template is dropped into /src/templates/<slug>.
const TEMPLATE_REGISTRY: Record<
  string,
  { Component: React.ComponentType<{ content: any }>; demo: any; active: any }
> = {
  'elite-restaurant': { Component: EliteRestaurantTemplate, demo: mockDemoContent, active: mockActiveContent },
  'pro-dental': { Component: ProDentalTemplate, demo: mockDentalDemoContent, active: mockDentalActiveContent },
};

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { state?: string };
}) {
  const entry = TEMPLATE_REGISTRY[params.slug];
  if (!entry) notFound();

  const { Component, demo, active } = entry;
  const content = searchParams.state === 'active' ? active : demo;
  return <Component content={content} />;
}
