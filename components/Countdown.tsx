'use client';
import { useEffect, useState } from 'react';

type T = { days: number; hours: number; minutes: number; seconds: number };
const ZERO: T = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function diff(to: Date): T {
  const now = new Date();
  const ms = Math.max(0, to.getTime() - now.getTime());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown({ targetISO }: { targetISO: string }) {
  const [t, setT] = useState<T>(ZERO);

  useEffect(() => {
    const target = new Date(targetISO);
    const update = () => setT(diff(target));
    update(); // 1ʳᵉ maj juste après le mount
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return (
    <div className="grid grid-flow-col gap-3 text-sm text-white/80">
      <div className="count-chip"><b>{t.days}</b> days</div>
      <div className="count-chip"><b>{t.hours}</b> hrs</div>
      <div className="count-chip"><b>{t.minutes}</b> min</div>
      <div className="count-chip">
        <b /* évite warning si jamais une ext change le DOM */ suppressHydrationWarning>{t.seconds}</b> sec
      </div>
      <style jsx>{`
        .count-chip {
          padding: .4rem .7rem; border-radius: .7rem;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
        }
      `}</style>
    </div>
  );
}
