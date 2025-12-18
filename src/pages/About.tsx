import {
  Info, Users, Sun, Moon, Sunrise, ArrowRight, ShieldCheck,
  Anchor, Flag, Heart, Calendar, Network
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-20 animate-fade-in py-12 px-4">

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <Info className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Light Trail Network
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Christian men following an example to become an example.
        </p>
      </div>

      {/* Overview & The Triad Core */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">The Triad Structure</h2>
          <p className="text-muted-foreground leading-relaxed">
            Men need an example to follow. We follow that example to become that example.
            A Triad is a cohesive, generational structure where three men serve in three distinct roles for one quarter,
            rotating upwards to create a spiritual lineage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold">Mentee</h3>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest">The Son</p>
            <p className="text-sm text-muted-foreground">
              The focus of the triad. His primary duty is spiritual growth, learning from the Mentor, and preparing to lead.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-emerald-500/10 rounded-full">
              <Heart className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Mentor</h3>
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">The Father</p>
            <p className="text-sm text-muted-foreground">
              Holds authority and makes decisions. He leads by example, pouring into the Mentee as he was poured into.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-amber-500/10 rounded-full">
              <Anchor className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold">Steward</h3>
            <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest">The Grandfather</p>
            <p className="text-sm text-muted-foreground">
              Oversees the triad's health. Delegating authority to the Mentor, he advises and steps in only if restoration is needed.
            </p>
          </div>
        </div>

        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="p-2 bg-secondary rounded-lg shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">The Scout</h4>
            <p className="text-sm text-muted-foreground">
              Men interested in joining are "Scouts". They observe, help with service projects, and look for needs the Triad can meet.
              Successful Scouts may become Mentees in the next quarter.
            </p>
          </div>
        </div>
      </div>

      {/* Starting a Triad */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Starting a Triad</h2>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
          <p>
            If no triad is available, you have the historic opportunity to start one. You are the founding member, setting the tone for the spiritual lineage that follows.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative p-5 bg-card border border-border rounded-xl">
            <div className="absolute -top-3 left-4 bg-background px-2 text-sm font-bold text-primary border border-border rounded-md">Step 1</div>
            <h3 className="font-semibold mb-2 mt-2">Start as Mentee</h3>
            <p className="text-sm text-muted-foreground">
              Founders begin as mentees. You must model the humility of learning before you can lead.
            </p>
          </div>
          <div className="relative p-5 bg-card border border-border rounded-xl">
            <div className="absolute -top-3 left-4 bg-background px-2 text-sm font-bold text-primary border border-border rounded-md">Step 2</div>
            <h3 className="font-semibold mb-2 mt-2">Find a Mentor</h3>
            <p className="text-sm text-muted-foreground">
              Find 3 Godly men. Ask one to be your Mentor—the "Founding Father" of the triad.
            </p>
          </div>
          <div className="relative p-5 bg-card border border-border rounded-xl">
            <div className="absolute -top-3 left-4 bg-background px-2 text-sm font-bold text-primary border border-border rounded-md">Step 3</div>
            <h3 className="font-semibold mb-2 mt-2">Find a Steward</h3>
            <p className="text-sm text-muted-foreground">
              Identify a spiritually mature believer to Steward the relationship. Your Mentor confirms this choice.
            </p>
          </div>
          <div className="relative p-5 bg-card border border-border rounded-xl">
            <div className="absolute -top-3 left-4 bg-background px-2 text-sm font-bold text-primary border border-border rounded-md">Step 4</div>
            <h3 className="font-semibold mb-2 mt-2">Launch</h3>
            <p className="text-sm text-muted-foreground">
              Dedicate the first week of the quarter (Preparation Week) to prayer and fasting together.
            </p>
          </div>
        </div>
      </div>

      {/* The Rhythms */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold">Rhythms & Schedule</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              The Daily M.A.N. Rhythm
            </h3>
            <div className="space-y-3 pl-4 border-l-2 border-border/50">
              <div className="flex items-center gap-3">
                <Sunrise className="w-5 h-5 text-orange-500" />
                <span className="text-sm"><strong>Morning:</strong> Worship & Prayer</span>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-yellow-500" />
                <span className="text-sm"><strong>Afternoon:</strong> Memorization & Application</span>
              </div>
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-indigo-500" />
                <span className="text-sm"><strong>Night:</strong> Study & Fellowship</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              The Quarterly Cycle
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Each quarter consists of <strong>13 weeks</strong>:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Week 1:</strong> Preparation (Prayer & Fasting)</li>
                <li><strong>Weeks 2-4:</strong> Session 1 (Individual Triad Service)</li>
                <li><strong>Weeks 5-7:</strong> Session 2 (3-Triad Network Service)</li>
                <li><strong>Weeks 8-10:</strong> Session 3 (9-Triad Network Service)</li>
                <li><strong>Weeks 11-13:</strong> Rest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Networking */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Network className="w-6 h-6 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold">Networking & Growth</h2>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Triads are designed to scale. They coordinate into <strong>3-Triad Pyramids</strong> and <strong>9-Triad Networks</strong> for larger service projects and spiritual strength.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-bold mb-1">The 3-Year Journey</h4>
              <p className="text-xs text-muted-foreground">
                A man may serve in triads for a maximum of 3 years. After completing a standard triad cycle, Stewards may start a <strong>Leadership Triad</strong>, and eventually a <strong>Servant Triad</strong> to mobilize larger networks.
              </p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="font-bold mb-1">Dynamic Networking</h4>
              <p className="text-xs text-muted-foreground">
                While static networks exist for stability, Triads can dynamically join forces with any other network for specific service projects based on needs and capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentoring Environments (Bottom) */}
      <div className="space-y-6 pt-8 border-t border-border/50">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Mentoring Environments</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Like the original YMCA, these triads start organically—bottom-up—where men already hang out naturally.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-5 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
            <h3 className="font-bold text-primary mb-1">1. Formation</h3>
            <p className="text-xs text-muted-foreground">Colleges, trade schools. Building habits of faith and discipline.</p>
          </div>
          <div className="p-5 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
            <h3 className="font-bold text-primary mb-1">2. Competition</h3>
            <p className="text-xs text-muted-foreground">Sports, gyms. Channeling ambition toward Christlike character.</p>
          </div>
          <div className="p-5 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
            <h3 className="font-bold text-primary mb-1">3. Contribution</h3>
            <p className="text-xs text-muted-foreground">Workplaces, trades. Seeing work as worship and provision.</p>
          </div>
          <div className="p-5 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
            <h3 className="font-bold text-primary mb-1">4. Correction</h3>
            <p className="text-xs text-muted-foreground">Recovery, re-entry. Repentance, restoration, and accountability.</p>
          </div>
          <div className="p-5 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
            <h3 className="font-bold text-primary mb-1">5. Continuity</h3>
            <p className="text-xs text-muted-foreground">Retirement, veterans. Rediscovering purpose and sharing wisdom.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-border/50 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          <span>Privacy Focused: No tracking, offline-first.</span>
        </div>
      </div>
    </div>
  );
}