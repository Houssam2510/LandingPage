export default function Socials() {
    const cls =
        "group inline-flex items-center justify-center w-10 h-10 rounded-xl " +
        "border border-border/60 bg-secondary/30 text-muted-foreground " +
        "transition duration-200 ease-out " +
        "hover:text-accent hover:border-accent/60 " +
        "hover:shadow-[0_0_1.2rem_hsl(var(--accent)/.35)] " +
        "hover:translate-y-[-1px] focus-ring";

    return (
        <div className="mt-8 flex items-center gap-3">
            {/* Instagram */}
            <a className={cls} aria-label="Instagram"
                href={`https://instagram.com/${process.env.NEXT_PUBLIC_BRAND_HANDLE_INSTAGRAM ?? "studylumina"}`}
                target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.1a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8zM17.8 6.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
            </a>

            {/* TikTok */}
            <a className={cls} aria-label="TikTok"
                href={`https://tiktok.com/@${process.env.NEXT_PUBLIC_BRAND_HANDLE_TIKTOK ?? "studylumina"}`}
                target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8.5a6.5 6.5 0 0 1-4-1.4V17a5.5 5.5 0 1 1-5.5-5.5c.2 0 .4 0 .5.1V14a3 3 0 1 0 3-3V3h3a6.5 6.5 0 0 0 3 5.5z" />
                </svg>
            </a>

            {/* X (Twitter) */}
            <a className={cls} aria-label="X"
                href={`https://x.com/${process.env.NEXT_PUBLIC_BRAND_HANDLE_X ?? "StudyLuminaAI"}`}
                target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h4.6l4.1 6.2L16.6 3H21l-7 8.7L21 21h-4.6l-4.4-6.7L7.4 21H3l7.3-9z" />
                </svg>
            </a>

            {/* LinkedIn */}
            <a className={cls} aria-label="LinkedIn"
                href={`${process.env.NEXT_PUBLIC_BRAND_LINKEDIN_URL ?? "https://www.linkedin.com/company/studylumina"}`}
                target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.38-1.12 2.5-2.48 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.5h5V24H0V8.5zM8 8.5h4.8v2.1h.07c.67-1.2 2.32-2.46 4.78-2.46 3.95 0 6.35 1.86 6.35 6.06V24h-5v-8.6c0-2.05-.74-3.45-2.6-3.45-1.42 0-2.27.96-2.64 1.9-.14.35-.18.84-.18 1.33V24H8V8.5z" />
                </svg>
            </a>
        </div>
    );
}
