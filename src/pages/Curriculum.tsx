import React from 'react';
import { useParams } from 'react-router-dom';
import CurriculumOverview from '../components/curriculum/CurriculumOverview';
import CurriculumDetail from '../components/curriculum/CurriculumDetail';

export default function Curriculum() {
    // If we have any routing params that indicate we are deep in the table, show Detail.
    // The params are defined in App.tsx routes, but we can check existence here if we just pass them through.
    const params = useParams();

    // Check if we are in a "table" route.
    // Since we are mapping /curriculum/table/* to this component in App.tsx,
    // we can rely on `section` param being present if we are in detail view.
    // However, we might want to be explicit.

    // Actually, simple check: if we have "section", we are in detail view.
    // But wait, the URL structure is /curriculum/table/:section...
    // If the path includes 'table', we should show detail.
    // But useParams only gives us what the Route matched. 

    // Let's assume App.tsx will route /curriculum -> Curriculum (Overview)
    // and /curriculum/table/* -> Curriculum (Detail)
    // So we just check if 'section' param exists? 
    // Or we could check location.pathname.

    // Better yet: Just check if `section` param is defined.
    // If we are at `/curriculum/table`, we might show a "Table of Contents" or just redirect/show empty?
    // Let's assume if 'section' is present, show Detail.

    const { section } = params;

    if (section) {
        return <CurriculumDetail />;
    }

    return <CurriculumOverview />;
}
