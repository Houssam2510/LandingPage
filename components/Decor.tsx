export default function Decor() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* starfield défini dans globals.css */}
            <div className="absolute inset-0 starfield" />

            {/* halos / aurora (violet foncé + accent néon) */}
            <div
                className="absolute -inset-[20%] blur-3xl opacity-30"
                style={{
                    background:
                        `radial-gradient(40% 30% at 15% 10%, hsl(var(--accent) / .28), transparent 60%),
             radial-gradient(45% 35% at 85% 15%, hsl(var(--primary) / .22), transparent 60%),
             radial-gradient(55% 45% at 50% 95%, hsl(var(--accent) / .16), transparent 60%)`,
                    mixBlendMode: "normal",
                }}
            />

            {/* anneau subtil qui tourne très lentement */}
            <div
                className="absolute -inset-[15%] opacity-[.18] blur-2xl animate-spin-slow"
                style={{
                    background:
                        "conic-gradient(from 180deg at 50% 50%, hsl(var(--accent) / .25), hsl(var(--primary) / .25), transparent)",
                }}
            />
        </div>
    );
}
