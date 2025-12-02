import React from 'react';
import { tableFullContent } from '../data/tableFullContent';
import { CollapsibleText } from '../components/CollapsibleText';

const Table: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-background">
            <div className="p-4 md:p-6 border-b shrink-0">
                <h1 className="text-2xl font-bold text-primary mb-2">T.A.B.L.E. Curriculum</h1>
                <p className="text-muted-foreground">
                    A comprehensive guide to spiritual maturity, ministry, and stewardship.
                </p>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="p-4 md:p-6 min-w-[1000px]"> {/* Min-width ensures table structure holds on mobile */}
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="p-4 w-[200px] sticky top-0 bg-muted/50 backdrop-blur-sm z-10">Area / Topic</th>
                                    <th className="p-4 w-[300px] sticky top-0 bg-muted/50 backdrop-blur-sm z-10">Maturity (Mentee)</th>
                                    <th className="p-4 w-[400px] sticky top-0 bg-muted/50 backdrop-blur-sm z-10">Ministry (Mentor)</th>
                                    <th className="p-4 w-[300px] sticky top-0 bg-muted/50 backdrop-blur-sm z-10">Missionary (Steward)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {tableFullContent.map((row, index) => (
                                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 align-top bg-background/50">
                                            <div className="font-semibold text-primary">{row.section}</div>
                                            {row.subsection && (
                                                <div className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">
                                                    {row.subsection}
                                                </div>
                                            )}
                                            {row.topic && (
                                                <div className="font-medium mt-1 text-foreground">
                                                    {row.topic}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 align-top text-muted-foreground">
                                            <CollapsibleText text={row.mentee} />
                                        </td>
                                        <td className="p-4 align-top">
                                            <CollapsibleText text={row.mentor} />
                                        </td>
                                        <td className="p-4 align-top text-muted-foreground">
                                            <CollapsibleText text={row.steward} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
