export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Halo conique 100% violet, léger */}
      <div
        className="absolute -inset-[10%] opacity-25 blur-3xl"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(138,43,226,.25), rgba(58,27,106,.25), transparent)',
          mixBlendMode: 'normal', // pas de mode d’écran qui éclaircirait
        }}
      />
      {/* Grain subtil, sans éclaircir */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.08,
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%224%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23n)%22/></svg>')",
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
