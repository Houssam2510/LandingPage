import Decor from "@/components/Decor";
import Logo from "@/components/Logo";
import Badge from "@/components/Badge";
import WaitlistForm from "@/components/WaitlistForm";
import Socials from "@/components/Socials";


export default function Page() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      <Decor />

      <section className="relative z-10 container pt-16 pb-24">
        {/* header simple */}
        <div className="mb-10 flex items-center justify-between">
          <Logo size={28} />
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary-foreground/90 border border-primary/30">
            Coming soon
          </span>
        </div>

        {/* hero card */}
        <div className="glass-card p-8 md:p-12 elev-neon">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Make studying <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                brilliant
              </span>.
            </h1>

            <p className="mt-5 text-lg md:text-xl text-muted-foreground">
              We’re crafting a calm, powerful tool for students: summarize PDFs,
              generate flashcards & quizzes, plan revisions, and more ...
              <br /> <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                All in one place
              </span> !
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>PDF Summaries</Badge>
              <Badge>Flashcards</Badge>
              <Badge>Quiz Generator</Badge>
              <Badge>Smart Planner</Badge>
              <Badge>Contextual Q&amp;A</Badge>
            </div>

            <div className="mt-8">
              <WaitlistForm />
              <p className="mt-2 text-xs text-muted-foreground">No spam. First invites go to early supporters.</p>
            </div>

            <Socials />

            <p className="mt-6 text-xs text-muted-foreground">
              © {new Date().getFullYear()} StudyLumina. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
