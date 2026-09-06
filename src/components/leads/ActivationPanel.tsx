'use client';

import { useState, useTransition } from 'react';
import { logPayment, generateUploadLink, publishSite } from '@/lib/actions';
import { Panel, SectionLabel, Button } from '@/components/ui/primitives';

export function ActivationPanel({ dealId, companyId, siteId }: { dealId: string; companyId: string; siteId?: string }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Cash / transfer');
  const [domain, setDomain] = useState<'subdomain' | 'custom'>('subdomain');
  const [uploadLink, setUploadLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleLogPayment() {
    setError(null);
    startTransition(async () => {
      try {
        await logPayment(dealId, Number(amount), method, domain);
      } catch (e: any) {
        setError(e.message);
      }
    });
  }

  function handleGenerateLink() {
    setError(null);
    startTransition(async () => {
      try {
        const link = await generateUploadLink(dealId, companyId);
        setUploadLink(link);
      } catch (e: any) {
        setError(e.message);
      }
    });
  }

  function handlePublish() {
    if (!siteId) return;
    setError(null);
    startTransition(async () => {
      try {
        await publishSite(siteId);
      } catch (e: any) {
        setError(e.message);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <Panel className="p-3 border-danger/40">
          <p className="text-xs text-danger">{error}</p>
        </Panel>
      )}

      <Panel className="p-4">
        <SectionLabel>Activate this site</SectionLabel>
        <p className="text-xs text-base-400 mb-3">
          Log the deal once the rep closes it over WhatsApp/call — this is what turns a demo into a live paid site.
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-base-400">Amount (MAD)</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="6000"
              className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-base-400">Payment method</span>
            <input
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-base-400">Domain</span>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value as 'subdomain' | 'custom')}
              className="bg-base-800 border border-base-700 px-2.5 py-1.5 text-sm text-base-100 focus:outline-none focus:border-signal"
            >
              <option value="subdomain">Keep subdomain</option>
              <option value="custom">Custom domain</option>
            </select>
          </label>
          <Button onClick={handleLogPayment} disabled={isPending || !amount} className="mt-2 w-full justify-center">
            {isPending ? 'Logging…' : 'Log payment'}
          </Button>
        </div>
      </Panel>

      <Panel className="p-4">
        <SectionLabel>Content intake</SectionLabel>
        <p className="text-xs text-base-400 mb-3">
          Generates a no-login upload link to send the client so they can drop their real photos.
        </p>
        {uploadLink ? (
          <div className="bg-base-800 border border-base-700 px-2.5 py-2 text-xs font-mono break-all text-signal">
            {uploadLink}
          </div>
        ) : (
          <Button variant="secondary" onClick={handleGenerateLink} disabled={isPending} className="w-full justify-center">
            {isPending ? 'Generating…' : 'Generate upload link'}
          </Button>
        )}
      </Panel>

      <Panel className="p-4">
        <SectionLabel>Publish</SectionLabel>
        <p className="text-xs text-base-400 mb-3">
          Swaps placeholder images for real ones and removes the demo banner. Requires payment logged and content received.
        </p>
        <Button
          variant="secondary"
          onClick={handlePublish}
          disabled={isPending || !siteId}
          className="w-full justify-center"
        >
          {isPending ? 'Publishing…' : 'Publish site'}
        </Button>
      </Panel>
    </div>
  );
}
