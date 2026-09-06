'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, Users, Layers, Globe, Hammer, KanbanSquare } from 'lucide-react';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/templates', label: 'Templates', icon: Layers },
  { href: '/builds', label: 'Bulk Build', icon: Hammer },
  { href: '/sites', label: 'Sites', icon: Globe },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 border-r border-base-700 bg-base-900 h-screen sticky top-0 flex flex-col">
      <div className="px-4 py-4 border-b border-base-700">
        <div className="font-mono text-sm text-signal">BUILDFACTORY</div>
        <div className="text-[11px] text-base-400">ops console</div>
      </div>
      <nav className="flex-1 py-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-2.5 px-4 py-2 text-sm border-l-2 transition-colors',
                active
                  ? 'border-signal text-base-100 bg-base-800'
                  : 'border-transparent text-base-400 hover:text-base-100 hover:bg-base-800/50',
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-base-700 text-[11px] text-base-500 font-mono">
        v0.1 — 6 sites live
      </div>
    </aside>
  );
}
