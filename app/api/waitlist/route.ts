import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { resend } from '@/lib/resend';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getBaseUrl(req: Request) {
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? 'studylumina.com';
    const proto = req.headers.get('x-forwarded-proto') ?? 'https';
    return `${proto}://${host}`;
}

export async function POST(req: Request) {
    try {
        const { email } = await req.json().catch(() => ({} as any));
        if (!email || !emailRe.test(String(email))) {
            return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
        }

        // Déjà inscrit ?
        const { data: existing, error: selErr } = await supabaseAdmin
            .from('waitlist')
            .select('id, created_at')
            .eq('email', email)
            .maybeSingle();

        if (selErr) {
            console.error('[waitlist] select error:', selErr);
            return NextResponse.json({ ok: false, error: selErr.message }, { status: 500 });
        }
        if (existing) {
            return NextResponse.json({ ok: true, state: 'exists', message: "You're already on the waitlist." });
        }

        // Insert
        const { error: insErr } = await supabaseAdmin.from('waitlist').insert([{ email }]);
        if (insErr) {
            console.error('[waitlist] insert error:', insErr);
            return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });
        }

        // Email
        const FROM = process.env.SIGNUP_NOTIFY_FROM || 'StudyLumina <onboarding@resend.dev>';
        const baseUrl = getBaseUrl(req);
       

        const html = `
  <div style="margin:0;padding:0;background:#0b0b10;color:#e7e7ea">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b10">
      <tr>
        <td align="center" style="padding:28px 16px">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:100%;background:#121018;border-radius:16px;border:1px solid rgba(255,255,255,.08);overflow:hidden">
            <tr><td style="padding:28px 24px 10px 24px">
              <h1 style="margin:0 0 8px 0;color:#fff;font:600 22px/1.3 Inter,system-ui,sans-serif">You’re on the list ✨</h1>
              <p style="margin:0 0 14px 0;color:#cfcfd6;font:14px/1.6 Inter,system-ui,sans-serif">
                Thanks for joining the waitlist. You’ll get early access updates and launch details soon.
              </p>
              <p style="margin:0 0 18px 0;color:#a7a7b1;font:14px/1.6 Inter,system-ui,sans-serif">For questions, reach us on our social channels:</p>
              <p style="margin:0 0 8px 0">
                <a href="https://instagram.com/${process.env.NEXT_PUBLIC_BRAND_HANDLE_INSTAGRAM ?? 'studylumina'}" style="color:#B834F1;text-decoration:none;margin-right:14px">Instagram</a>
                <a href="https://tiktok.com/@${process.env.NEXT_PUBLIC_BRAND_HANDLE_TIKTOK ?? 'studylumina'}" style="color:#B834F1;text-decoration:none;margin-right:14px">TikTok</a>
                <a href="https://x.com/${process.env.NEXT_PUBLIC_BRAND_HANDLE_X ?? 'StudyLuminaAI'}" style="color:#B834F1;text-decoration:none;margin-right:14px">X</a>
                <a href="${process.env.NEXT_PUBLIC_BRAND_LINKEDIN_URL ?? 'https://www.linkedin.com/company/studylumina'}" style="color:#B834F1;text-decoration:none">LinkedIn</a>
              </p>
              <p style="margin:16px 0 0 0;color:#7e7e89;font:13px/1.6 Inter,system-ui,sans-serif">— The StudyLumina team</p>
            </td></tr>
          </table>
          <p style="color:#80808a;font:12px/1.6 Inter,system-ui,sans-serif;margin:14px 0 0 0">© ${new Date().getFullYear()} StudyLumina</p>
        </td>
      </tr>
    </table>
  </div>`.trim();

        const sendRes = await resend.emails.send({
            from: FROM,
            to: [email],
            subject: "You're on the list ✨ — StudyLumina",
            html,
        });

        if (sendRes.error) {
            console.error('[waitlist] resend error:', sendRes.error);
            return NextResponse.json({ ok: true, state: 'subscribed', email: 'error', error: sendRes.error.message });
        }

        return NextResponse.json({ ok: true, state: 'subscribed', email: 'ok', id: sendRes.data?.id ?? null });
    } catch (e: any) {
        console.error('[waitlist] server error:', e);
        return NextResponse.json({ ok: false, error: e?.message || 'Server error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
