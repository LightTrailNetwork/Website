import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProphecyView from '../components/study/ProphecyView';
import PeopleView from '../components/study/PeopleView';
import TimelineView from '../components/study/TimelineView';
import ThemesView from '../components/study/ThemesView';
import GenericStudyView from '../components/study/GenericStudyView';

export default function StudyToolPage() {
    const { toolId } = useParams();
    const navigate = useNavigate();

    // Mapping toolId to content
    const renderContent = () => {
        switch (toolId) {
            case 'prophecy':
                return <ProphecyView />;
            case 'people':
                return <PeopleView />;
            case 'timeline':
                return <TimelineView />;
            case 'themes':
                return <ThemesView />;

            // Placeholders with specific text
            case 'places':
                return <GenericStudyView title="Places & Maps" description="Interactive maps and geographic context coming soon." />;
            case 'symbols':
                return <GenericStudyView title="Motifs & Symbols" description="Tracking recurring imagery like Water, Fire, and Bread." />;
            case 'typology':
                return <GenericStudyView title="Typology" description="Deep dives into Old Testament shadows of Christ." />;
            case 'harmony':
                return <GenericStudyView title="Gospel Harmony" description="Parallel viewing of the four Gospels." />;
            case 'patterns':
                return <GenericStudyView title="Structure Patterns" description="Chiasms, literary envelopes, and repeated structures." />;
            case 'outlines':
                return <GenericStudyView title="Book Outlines" description="Detailed structural outlines of every Bible book." />;
            case 'eras':
                return <GenericStudyView title="Biblical Eras" description="The grand epochs of Redemptive History." />;
            default:
                return (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-destructive">Tool Not Found</h2>
                        <button onClick={() => navigate('/bible/study')} className="mt-4 text-primary hover:underline">Return to Hub</button>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20 animate-fade-in">
            {/* Back Button */}
            <button
                onClick={() => navigate('/bible/study')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 group transition-colors"
            >
                <div className="p-1 rounded-full group-hover:bg-secondary/20">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-medium">Back to Study Hub</span>
            </button>

            {/* Content Area */}
            {renderContent()}
        </div>
    );
}
