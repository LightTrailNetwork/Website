import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    showBackButton?: boolean;
    className?: string;
}

export default function Breadcrumbs({ items, showBackButton = true, className = '' }: BreadcrumbsProps) {
    const navigate = useNavigate();

    return (
        <nav className={`flex items-center text-sm text-muted-foreground mb-0 animate-fade-in ${className}`} aria-label="Breadcrumb">
            {showBackButton && (
                <button
                    onClick={() => navigate(-1)}
                    className="mr-4 p-1 hover:bg-accent/10 rounded-full transition-colors text-foreground"
                    title="Go Back"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            )}

            <ol className="flex items-center flex-wrap gap-2">
                <li>
                    <Link to="/" className="hover:text-primary transition-colors flex items-center">
                        <Home className="w-4 h-4" />
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
                        {item.to ? (
                            <Link to={item.to} className="hover:text-primary transition-colors font-medium">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-foreground font-semibold" aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
