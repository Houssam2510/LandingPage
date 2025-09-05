import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

type Body = {
    to: string | string[];
    subject?: string;
    html?: string;
    text?: string;
};

export async function POST(req: Request) {
    try {
        // (Optionnel) protège l'endpoint via un token si tu veux :
        // if (process.env.RESEND_NOTIFY_TOKEN) {
        //   const hdr = req.headers.get('x-notify-token');
        //   if (hdr !== process.env.RESEND_NOTIFY_TOKEN) {
        //     return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        //   }
        // }

        const { to, subject, html, text }: Body = await req.json().catch(() => ({} as any));
        if (!to) return NextResponse.json({ error: '`to` is required' }, { status: 400 });

        const toList = Array.isArray(to) ? to.filter(Boolean) : [to];
        if (toList.length === 0) return NextResponse.json({ error: '`to` is empty' }, { status: 400 });

        // Utilise exactement ta variable d'env
        const FROM = process.env.SIGNUP_NOTIFY_FROM || 'StudyLumina <onboarding@resend.dev>';

        // --- IMPORTANT pour Resend types: on fournit TOUJOURS "html" (fallback si absent) ---
        const htmlContent =
            (typeof html === 'string' && html.trim().length > 0)
                ? html
                : `<div style="background:#0b0b10;color:#e7e7ea;padding:24px;font:14px/1.6 Inter,system-ui,sans-serif">
             <h2 style="margin:0 0 10px 0;color:#fff">Thanks for joining the waitlist!</h2>
             <p style="margin:0;color:#cfcfd6">Follow our socials for updates. — StudyLumina</p>
           </div>`;

        // Construit la payload minimale valide pour CreateEmailOptions
        const payload = {
            from: FROM,
            to: toList,
            subject: subject || 'StudyLumina',
            html: htmlContent, // ✅ évite l’erreur TS "react is required"
            ...(text ? { text } : {}),
        };

        const result = await resend.emails.send(payload);

        if (result.error) {
            return NextResponse.json({ error: result.error.message }, { status: 500 });
        }
        return NextResponse.json({ ok: true, id: result.data?.id ?? null });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
