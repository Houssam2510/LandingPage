'use client';
import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'exists' | 'err'>('idle');
  const [msg, setMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending'); setMsg('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({} as any));

      if (!res.ok || body?.ok === false) {
        setState('err');
        setMsg(body?.error || 'An error occurred.');
        return;
      }

      if (body?.state === 'exists') {
        setState('exists');
        setMsg(body?.message || "You're already on the waitlist.");
        return;
      }

      setState('ok');
      setMsg('Thanks! Check your inbox soon.');
      setEmail('');
    } catch {
      setState('err');
      setMsg('Network error.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="email" className="sr-only">Email</label>
      <input
        id="email" type="email" required value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl bg-muted/40 text-foreground
                   placeholder:[color:hsl(var(--placeholder))] border border-border/70 focus-ring"
      />
      <button
        type="submit" disabled={state === 'sending'}
        className="rounded-2xl px-5 py-3 font-medium text-primary-foreground
                   bg-gradient-to-r from-primary to-accent shadow-neon hover:opacity-95
                   active:scale-[.99] transition disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…'
          : state === 'ok' ? 'Thanks! ✔'
            : state === 'exists' ? 'Already joined ✔'
              : state === 'err' ? 'Retry'
                : 'Join waitlist'}
      </button>

      {msg && (
        <p className="mt-2 text-xs text-muted-foreground">{msg}</p>
      )}
    </form>
  );
}
