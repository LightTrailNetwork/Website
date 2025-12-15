import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProphecyView from '../components/study/ProphecyView';
import PeopleView from '../components/study/PeopleView';
import TimelineView from '../components/study/TimelineView';
import ThemesView from '../components/study/ThemesView';
import PlacesView from '../components/study/PlacesView';
import SymbolsView from '../components/study/SymbolsView';
import TypologyView from '../components/study/TypologyView';
import HarmonyView from '../components/study/HarmonyView';
import PatternsView from '../components/study/PatternsView';
import OutlinesView from '../components/study/OutlinesView';
import ErasView from '../components/study/ErasView';
import ArchaeologyView from '../components/study/ArchaeologyView';
import FeastsView from '../components/study/FeastsView';
import MiraclesView from '../components/study/MiraclesView';
import ParablesView from '../components/study/ParablesView';
import ApostlesView from '../components/study/ApostlesView';
import TranslationsView from '../components/study/TranslationsView';
import GenericStudyView from '../components/study/GenericStudyView';
import DivineNamesView from '../components/study/DivineNamesView';

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
            case 'places':
                return <PlacesView />;
            case 'symbols':
                return <SymbolsView />;
            case 'typology':
                return <TypologyView />;
            case 'harmony':
                return <HarmonyView />;
            case 'patterns':
                return <PatternsView />;
            case 'outlines':
                return <OutlinesView />;
            case 'eras':
                return <ErasView />;
            case 'archaeology':
                return <ArchaeologyView />;
            case 'feasts':
                return <FeastsView />;
            case 'prophecy':
                return <ProphecyView />;
            case 'miracles':
                return <MiraclesView />;
            case 'parables':
                return <ParablesView />;
            case 'translations':
                return <TranslationsView />;
            case 'apostles':
                return <ApostlesView />;
            case 'people':
                return <PeopleView />;
            case 'names':
                return <DivineNamesView />;
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
