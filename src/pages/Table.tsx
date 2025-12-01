import { Table as TableIcon } from 'lucide-react';

export default function Table() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
            <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TableIcon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground tracking-tight">T.A.B.L.E.</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Quarter Curriculum
                </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm text-center">
                <p className="text-muted-foreground">Curriculum content coming soon...</p>
            </div>
        </div>
    );
}
