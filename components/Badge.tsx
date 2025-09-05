export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl px-3 py-1 text-xs
                     bg-secondary/60 text-secondary-foreground/90 border border-border/60">
      {children}
    </span>
  );
}
