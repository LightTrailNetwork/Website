import { Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GenericStudyViewProps {
    title: string;
    description: string;
}

export default function GenericStudyView({ title, description }: GenericStudyViewProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="p-6 bg-secondary/10 rounded-full">
                <Construction className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="space-y-2 max-w-md">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground text-lg">
                    {description || "This advanced study tool is currently under construction."}
                </p>
                <div className="pt-6">
                    <button
                        onClick={() => navigate('/bible/study')}
                        className="text-primary hover:underline font-medium"
                    >
                        Return to Hub
                    </button>
                </div>
            </div>
        </div>
    );
}
