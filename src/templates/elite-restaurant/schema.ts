// Re-exports the shared contract — every template validates against the same
// TemplateContent shape defined in /src/lib/schema.ts. A template-specific file
// exists so a template CAN narrow/extend it later without touching the core.
export { templateContentSchema as eliteRestaurantContentSchema } from '@/lib/schema';
export type { TemplateContent as EliteRestaurantContent } from '@/lib/schema';
