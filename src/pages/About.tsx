import { Info, Shield, Server, Mail, CheckCircle2, XCircle, Database, Wifi, Code2, GitBranch } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* About Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Info className="w-5 h-5 text-primary" />
            <h2>About This App</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                This is a Christian men's mentorship application built around the
                "triad" model - a five-role mentorship system designed to foster
                spiritual growth and brotherhood.
              </p>

              <p>
                The app provides daily guidance through the M.A.N. (Morning, Afternoon, Night)
                rhythm, helping you stay connected to your faith and your brothers in Christ.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
              <h3 className="font-medium text-primary mb-3 text-sm">The Five Roles</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">Steward:</span>
                  <span>Guides and oversees the triad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">Mentor:</span>
                  <span>Leads and teaches the mentee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">Mentee:</span>
                  <span>Learns and grows under guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">Scout:</span>
                  <span>Prepares to become mentee next quarter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary">Pre-Scout:</span>
                  <span>Observes and prepares to enter</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Shield className="w-5 h-5 text-primary" />
            <h2>Privacy & Data</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h3 className="font-medium text-green-700 dark:text-green-400 mb-3 flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                What we DO
              </h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Store all data locally in your browser
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Work completely offline
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Let you share data via QR codes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                  Respect your privacy completely
                </li>
              </ul>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
              <h3 className="font-medium text-destructive mb-3 flex items-center gap-2 text-sm">
                <XCircle className="w-4 h-4" />
                What we DON'T do
              </h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-destructive" />
                  Send any data to external servers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-destructive" />
                  Track your activity or behavior
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-destructive" />
                  Require sign-in or accounts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-destructive" />
                  Share your information with anyone
                </li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground italic px-2">
              Your data belongs to you. The app works entirely in your browser
              and never communicates with external servers.
            </p>
          </div>
        </div>

        {/* Technical Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Server className="w-5 h-5 text-primary" />
            <h2>Technical Details</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">App Type</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">PWA</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Storage</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">IndexedDB</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Connectivity</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">Offline-first</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Version</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">1.0.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Mail className="w-5 h-5 text-primary" />
            <h2>Contact & Support</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="text-sm text-muted-foreground space-y-4">
              <p>
                For questions about the mentorship program or technical support,
                please contact your local triad steward or program coordinator.
              </p>

              <p className="text-xs text-muted-foreground/60 italic border-t border-border pt-4">
                This app is designed to work independently without external support,
                but human guidance and fellowship remain essential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}