// lib/resend.ts
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
export const resend = new Resend(key);

// (Optionnel) helper pour envoyer un email simple
export async function sendWaitlistWelcome(to: string, subject = 'Welcome to StudyLumina') {
    if (!process.env.SIGNUP_NOTIFY_FROM) {
        throw new Error('SIGNUP_NOTIFY_FROM is missing');
    }
    return resend.emails.send({
        from: process.env.SIGNUP_NOTIFY_FROM,
        to: [to],
        subject,
        html: `<div style="font-family:Inter,system-ui,Arial,sans-serif">
      <img src="https://studylumina.com/logo-hero.svg" alt="StudyLumina" height="40" style="opacity:.9"/>
      <h2>Thanks for joining the waitlist 🎓</h2>
      <p>We’ll ping you when the beta opens.</p>
    </div>`
    });
}
