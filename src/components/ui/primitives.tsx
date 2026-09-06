import clsx from 'clsx';
import type { DealStage } from '@/lib/schema';

/** A hairline-bordered panel — used instead of the generic rounded-shadow-card
 *  everywhere, reserving actual elevation for things that are truly floating
 *  (modals, dropdowns). */
export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx('border border-base-700 bg-base-900', className)}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-wide text-base-400 mb-2">{children}</div>;
}

const stageStyles: Record<DealStage, string> = {
  scraped: 'text-base-400 border-base-600',
  demo_built: 'text-steel border-steel/40',
  demo_sent: 'text-steel border-steel/40',
  demo_viewed: 'text-signal border-signal/40',
  replied: 'text-signal border-signal/40',
  paid: 'text-ok border-ok/40',
  activated: 'text-ok border-ok/40',
  lost: 'text-danger border-danger/40',
};

const stageLabels: Record<DealStage, string> = {
  scraped: 'Scraped',
  demo_built: 'Demo built',
  demo_sent: 'Demo sent',
  demo_viewed: 'Demo viewed',
  replied: 'Replied',
  paid: 'Paid',
  activated: 'Activated',
  lost: 'Lost',
};

export function StageBadge({ stage }: { stage: DealStage }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 text-xs border font-mono',
        stageStyles[stage],
      )}
    >
      {stageLabels[stage]}
    </span>
  );
}

export function StatusDot({ status }: { status: 'demo' | 'active' | 'archived' }) {
  const color =
    status === 'active' ? 'bg-ok' : status === 'demo' ? 'bg-signal' : 'bg-base-500';
  return <span className={clsx('inline-block w-1.5 h-1.5 rounded-full mr-2', color)} />;
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = {
    primary: 'bg-signal text-base-950 hover:bg-signal-bright',
    secondary: 'border border-base-600 text-base-100 hover:border-base-400',
    ghost: 'text-base-300 hover:text-base-100',
  }[variant];
  return (
    <button
      className={clsx('px-3 py-1.5 text-sm font-medium transition-colors', styles, className)}
      {...props}
    />
  );
}

export function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Panel className="p-4">
      <SectionLabel>{label}</SectionLabel>
      <div className="text-2xl font-semibold font-mono">{value}</div>
      {sub && <div className="text-xs text-base-400 mt-1">{sub}</div>}
    </Panel>
  );
}
