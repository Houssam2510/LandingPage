// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  // Couleur de barre adresse / mobile
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'hsl(260 45% 4%)' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://studylumina.com'),
  title: {
    default: 'StudyLumina — Coming Soon',
    template: '%s | StudyLumina',
  },
  description:
    'A calm, powerful tool for students: summaries, flashcards, quizzes, and a smart planner — all in one place.',
  // Pas de "icons" ici : Next utilisera automatiquement app/icon.png
  // (ne déclare pas /public/... dans metadata, sinon risques de 404)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // dark par défaut pour activer ta palette .dark définie dans globals.css
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
