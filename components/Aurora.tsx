export default function Aurora() {
    return (
        <div className="pointer-events-none absolute inset-0">
            {/* base starfield ultra léger */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '3px 3px',
                    backgroundPosition: '0 0, 1.5px 1.5px',
                }}
            />

            {/* halos violets (noir + violet foncé + violet électrique) */}
            <div
                className="absolute -inset-[15%] blur-3xl opacity-25"
                style={{
                    background:
                        'radial-gradient(40% 30% at 20% 10%, rgba(138,43,226,.35), transparent 60%),' + // violet électrique
                        'radial-gradient(45% 35% at 80% 15%, rgba(58,27,106,.28), transparent 60%),' +   // violet foncé
                        'radial-gradient(60% 45% at 50% 90%, rgba(138,43,226,.18), transparent 60%)',
                    mixBlendMode: 'normal',
                }}
            />

            {/* léger rayon conique */}
            <div
                className="absolute -inset-[10%] blur-2xl opacity-20"
                style={{
                    background:
                        'conic-gradient(from 180deg at 50% 50%, rgba(138,43,226,.25), rgba(58,27,106,.25), transparent)',
                }}
            />
        </div>
    );
}
