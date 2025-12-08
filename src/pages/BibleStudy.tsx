import { BookOpen } from 'lucide-react';

export default function BibleStudy() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-500">
            <div className="p-6 bg-primary/10 rounded-full">
                <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <div className="space-y-4 max-w-md">
                <h1 className="text-3xl font-bold">Bible Study</h1>
                <p className="text-muted-foreground text-lg">
                    Deep dive tools and group study features are coming soon.
                </p>
                <div className="p-4 bg-secondary/10 rounded-lg border border-border text-sm text-muted-foreground/80">
                    <p>Planned features:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-left inline-block">
                        <li>Inductive Study Tools</li>
                        <li>Group Discussion Questions</li>
                        <li>Topic Explorer</li>
                        <li>Character Studies</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
