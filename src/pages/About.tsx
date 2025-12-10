import { Info, Users, Sun, Moon, Sunrise, ArrowRight, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fade-in py-8 px-4">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Light Trail Network
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A dedicated space for Christian men to foster brotherhood, discipline, and spiritual growth through structured mentorship.
        </p>
      </div>

      {/* Mission / Core Concept */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-center font-medium text-lg leading-relaxed">
          The Light Trail Network is built to counter isolation and stagnation. work requires community, and growth requires a plan. This application is the digital companion to the tangible work of discipleship.
        </p>
      </div>

      {/* The Triad Model */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">The Triad Model</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Our mentorship structure is built on the <strong>Triad</strong>—a robust, three-role system designed to ensure every man is both guided and guiding others, along with a Scout and Pre-Scout role for those entering the trail.
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl shadow-sm">
              <span className="font-bold text-primary min-w-[80px]">Steward</span>
              <span className="text-sm text-muted-foreground">The overseer who guides the health and direction of the triad.</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl shadow-sm">
              <span className="font-bold text-primary min-w-[80px]">Mentor</span>
              <span className="text-sm text-muted-foreground">Lead by example, actively teaching and pouring into a mentee.</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl shadow-sm">
              <span className="font-bold text-primary min-w-[80px]">Mentee</span>
              <span className="text-sm text-muted-foreground">The primary learner, focused on absorption and growth.</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-muted/50 border border-border/50 rounded-xl">
              <span className="font-medium text-muted-foreground min-w-[80px]">Scout</span>
              <span className="text-sm text-muted-foreground">Preparing to enter, observing the rhythm of the trail.</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-muted/30 border border-border/30 rounded-xl">
              <span className="font-medium text-muted-foreground min-w-[80px]">Pre-Scout</span>
              <span className="text-sm text-muted-foreground">Observing from a distance, considering the commitment.</span>
            </li>
          </ul>
        </div>

        {/* The M.A.N. Rhythm */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Sunrise className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold">The M.A.N. Rhythm</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Discipline is maintained through a daily rhythm of Morning, Afternoon, and Night (M.A.N.) rhythyms.
          </p>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <Sunrise className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-semibold">Morning</h3>
                <p className="text-xs text-muted-foreground">Worship & Prayer</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <Sun className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Afternoon</h3>
                <p className="text-xs text-muted-foreground">Memorization & Application</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <Moon className="w-6 h-6 text-indigo-500" />
              <div>
                <h3 className="font-semibold">Night</h3>
                <p className="text-xs text-muted-foreground">Study & Fellowship</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Privacy Note */}
      <div className="mt-12 pt-8 border-t border-border/50 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          <span>Privacy Focused: No tracking, offline-first.</span>
        </div>
      </div>
    </div>
  );
}