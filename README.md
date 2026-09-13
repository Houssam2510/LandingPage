<div align="center">

<img src="public/logo.svg" alt="StudyLumina" height="64" />

# StudyLumina — Landing & waitlist

### La page « coming soon » qui a ouvert la liste d'attente de StudyLumina

**Une page Next.js, un formulaire, et deux choses qui comptent : l'adresse atterrit dans Supabase sans doublon, et le candidat reçoit immédiatement une confirmation.**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-waitlist-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-email-000000)](https://resend.com/)

[🇫🇷 Français](#-français) · [🇬🇧 English](#-english)

</div>

---

<details open>
<summary><h2 id="-français">&nbsp;🇫🇷&nbsp;&nbsp;Français</h2></summary>

<br/>

## Ce que c'est

La page d'attente publiée avant le lancement de **StudyLumina** — l'outil d'étude qui résume des PDF, génère des fiches et des quiz, et planifie les révisions. Une seule route, aucune authentification, aucun tableau de bord : capter une adresse, la stocker proprement, et répondre tout de suite.

Le produit complet vit ailleurs ; ce dépôt est la page qui l'a précédé.

## Le parcours d'une inscription

```
Formulaire (email)
  └─► POST /api/waitlist
        ├─ validation      : expression régulière côté serveur, 400 si invalide
        ├─ Supabase select : déjà inscrit ? → 200 « state: exists », aucun doublon,
        │                    aucun second courriel
        ├─ Supabase insert : table `waitlist`, via la clé service role (serveur seul)
        └─ Resend          : courriel de confirmation, mis en forme en HTML inline
                             ↳ un échec d'envoi NE fait PAS échouer l'inscription :
                               la réponse reste 200 et signale l'erreur d'email
```

Ce dernier point est le choix de conception de la route : une adresse déjà enregistrée ne doit pas être perdue parce que le fournisseur d'email a hoqueté. L'inscription est l'opération critique ; le courriel est un effet de bord.

## La page

Une section, une carte de verre sur un fond animé :

- un titre en dégradé et les cinq promesses en étiquettes — résumés de PDF, fiches, générateur de quiz, planificateur, Q&R contextuelles ;
- le formulaire de waitlist, avec ses états de chargement, de succès et d'erreur ;
- les liens sociaux, dont les identifiants sont configurables par variables d'environnement ;
- un décor purement CSS : champ d'étoiles, halos en `radial-gradient`, et un anneau conique qui tourne très lentement. Aucune image, aucune librairie d'animation.

Le thème est forcé en sombre (`<html className="dark">`), la couleur de la barre d'adresse est déclarée pour les deux préférences système, et l'icône est reprise automatiquement depuis `app/icon.png`.

## 🛠 Stack

| Couche | Technologie |
| --- | --- |
| **Framework** | Next.js 14 (App Router) · React 18 · TypeScript |
| **Styles** | Tailwind CSS 3.4 · `@tailwindcss/forms` · `@tailwindcss/typography` · `tailwindcss-animate` |
| **Données** | Supabase — table `waitlist`, écrite côté serveur avec la clé **service role** |
| **Email** | Resend, gabarit HTML inline (compatible clients de messagerie) |
| **SEO** | `metadataBase`, titre en gabarit, description, `themeColor` clair/sombre |

## 🚀 Démarrer

```bash
git clone https://github.com/Houssam2510/LandingPage.git
cd LandingPage
npm install
```

Créez un `.env.local` (le dépôt n'en fournit pas d'exemple) :

```bash
# Supabase — la clé service role est SERVEUR UNIQUEMENT, jamais préfixée NEXT_PUBLIC_
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
SUPABASE_SERVICE_ROLE="eyJ..."

# Resend
RESEND_API_KEY="re_..."
SIGNUP_NOTIFY_FROM="StudyLumina <no-reply@votre-domaine-verifie.com>"

# Liens sociaux (optionnels — des valeurs par défaut existent)
NEXT_PUBLIC_BRAND_HANDLE_INSTAGRAM="studylumina"
NEXT_PUBLIC_BRAND_HANDLE_TIKTOK="studylumina"
NEXT_PUBLIC_BRAND_HANDLE_X="StudyLuminaAI"
NEXT_PUBLIC_BRAND_LINKEDIN_URL="https://www.linkedin.com/company/studylumina"
```

Côté Supabase, une seule table suffit :

```sql
create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);
```

Puis :

```bash
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint     # next lint
```

> `SIGNUP_NOTIFY_FROM` doit être sur un domaine **vérifié** chez Resend. Sans domaine vérifié, seul `onboarding@resend.dev` fonctionne, et uniquement pour des tests.

## 📁 Structure

```
.
├── app/
│   ├── page.tsx              la page unique
│   ├── layout.tsx            métadonnées, thème sombre forcé, themeColor
│   ├── globals.css           tokens HSL, starfield, glass-card, animations
│   ├── icon.png              favicon (reprise automatique par Next)
│   └── api/
│       ├── waitlist/route.ts inscription : validation → dédoublonnage → insert → email
│       └── notify/route.ts   envoi d'un courriel arbitraire (voir Points connus)
├── components/               Logo · Badge · WaitlistForm · Socials · Decor · Aurora
│                             Background · Countdown (présent, non monté sur la page)
├── lib/
│   ├── supabaseAdmin.ts      client service role, serveur uniquement
│   └── resend.ts             client Resend
└── public/                   logo.svg · logo-hero.svg
```

## Points connus

- **`POST /api/notify` n'est pas protégé.** La vérification par `RATE_LIMIT`/token est présente dans le fichier mais **commentée** : en l'état, la route accepte `to`, `subject` et `html` de n'importe qui et les envoie depuis votre domaine vérifié — un relais de courriel ouvert. Avant tout déploiement : décommenter le contrôle de `RESEND_NOTIFY_TOKEN`, ou supprimer la route (la page ne s'en sert pas).
- **Aucune limitation de débit sur `/api/waitlist`.** Rien n'empêche d'inonder la table d'adresses valides mais fictives.
- **`Countdown` n'est pas monté** sur la page : le composant existe et attend un `targetISO`, mais `app/page.tsx` ne l'importe pas.

</details>

<details>
<summary><h2 id="-english">&nbsp;🇬🇧&nbsp;&nbsp;English</h2></summary>

<br/>

## What this is

The coming-soon page published before **StudyLumina** launched — the study tool that summarizes PDFs, generates flashcards and quizzes, and plans revisions. One route, no authentication, no dashboard: capture an address, store it cleanly, and answer immediately.

The full product lives elsewhere; this repository is the page that came before it.

## The signup journey

```
Form (email)
  └─► POST /api/waitlist
        ├─ validation      : server-side regex, 400 when invalid
        ├─ Supabase select : already signed up? → 200 "state: exists", no duplicate,
        │                    no second email
        ├─ Supabase insert : `waitlist` table, via the service-role key (server only)
        └─ Resend          : confirmation email, inline-styled HTML
                             ↳ a send failure does NOT fail the signup:
                               the response stays 200 and reports the email error
```

That last point is the route's design decision: an address already recorded must not be lost because the email provider hiccupped. The signup is the critical operation; the email is a side effect.

## The page

One section, a glass card on an animated background:

- a gradient headline and the five promises as badges — PDF summaries, flashcards, quiz generator, smart planner, contextual Q&A;
- the waitlist form, with its loading, success and error states;
- social links, whose handles are configurable through environment variables;
- a purely CSS set piece: a starfield, `radial-gradient` halos, and a conic ring spinning very slowly. No images, no animation library.

The theme is forced dark (`<html className="dark">`), the address-bar colour is declared for both system preferences, and the icon is picked up automatically from `app/icon.png`.

## 🛠 Tech stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 14 (App Router) · React 18 · TypeScript |
| **Styling** | Tailwind CSS 3.4 · `@tailwindcss/forms` · `@tailwindcss/typography` · `tailwindcss-animate` |
| **Data** | Supabase — a `waitlist` table, written server-side with the **service-role** key |
| **Email** | Resend, inline-styled HTML template (mail-client safe) |
| **SEO** | `metadataBase`, templated title, description, light/dark `themeColor` |

## 🚀 Getting started

```bash
git clone https://github.com/Houssam2510/LandingPage.git
cd LandingPage
npm install
```

Create a `.env.local` (the repo ships no example):

```bash
# Supabase — the service-role key is SERVER ONLY, never prefixed NEXT_PUBLIC_
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
SUPABASE_SERVICE_ROLE="eyJ..."

# Resend
RESEND_API_KEY="re_..."
SIGNUP_NOTIFY_FROM="StudyLumina <no-reply@your-verified-domain.com>"

# Social links (optional — defaults exist)
NEXT_PUBLIC_BRAND_HANDLE_INSTAGRAM="studylumina"
NEXT_PUBLIC_BRAND_HANDLE_TIKTOK="studylumina"
NEXT_PUBLIC_BRAND_HANDLE_X="StudyLuminaAI"
NEXT_PUBLIC_BRAND_LINKEDIN_URL="https://www.linkedin.com/company/studylumina"
```

On the Supabase side, one table is enough:

```sql
create table public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);
```

Then:

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # next lint
```

> `SIGNUP_NOTIFY_FROM` must be on a Resend-**verified** domain. Without one, only `onboarding@resend.dev` works, and only for testing.

## 📁 Project structure

```
.
├── app/
│   ├── page.tsx              the single page
│   ├── layout.tsx            metadata, forced dark theme, themeColor
│   ├── globals.css           HSL tokens, starfield, glass-card, animations
│   ├── icon.png              favicon (picked up automatically by Next)
│   └── api/
│       ├── waitlist/route.ts signup: validation → dedupe → insert → email
│       └── notify/route.ts   sends an arbitrary email (see Known issues)
├── components/               Logo · Badge · WaitlistForm · Socials · Decor · Aurora
│                             Background · Countdown (present, not mounted on the page)
├── lib/
│   ├── supabaseAdmin.ts      service-role client, server only
│   └── resend.ts             Resend client
└── public/                   logo.svg · logo-hero.svg
```

## Known issues

- **`POST /api/notify` is unprotected.** The token check exists in the file but is **commented out**: as it stands, the route accepts `to`, `subject` and `html` from anyone and sends them from your verified domain — an open email relay. Before deploying: uncomment the `RESEND_NOTIFY_TOKEN` check, or delete the route (the page doesn't use it).
- **No rate limiting on `/api/waitlist`.** Nothing stops someone flooding the table with valid but fictitious addresses.
- **`Countdown` isn't mounted** on the page: the component exists and expects a `targetISO`, but `app/page.tsx` doesn't import it.

</details>
