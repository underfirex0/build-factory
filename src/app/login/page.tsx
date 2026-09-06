'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button, Panel } from '@/components/ui/primitives';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(searchParams.get('next') || '/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-950">
      <Panel className="w-full max-w-sm p-6">
        <div className="font-mono text-sm text-signal mb-1">BUILDFACTORY</div>
        <div className="text-xs text-base-400 mb-6">Sign in to the ops console</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-base-400">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-base-400">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal"
            />
          </label>
          {error && <p className="text-xs text-danger">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full justify-center mt-2">
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        <p className="text-[11px] text-base-500 mt-4">
          No account yet? Create one from your Supabase project's Authentication tab.
        </p>
      </Panel>
    </div>
  );
}
