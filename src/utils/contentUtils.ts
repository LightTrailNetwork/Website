import { tableFullContent } from '../data/tableFullContent';
import type { TableRow } from '../data/tableFullContent';
import type { DailyContent } from '../data/tableData';

export function getStudyContent(dailyContent: DailyContent | null): TableRow[] {
    if (!dailyContent || !dailyContent.study) return [];

    const studyTopic = dailyContent.study.toLowerCase();
    const area = dailyContent.area ? dailyContent.area.toLowerCase() : '';

    // Filter rows where the topic or subsection matches the study topic
    // We use a flexible matching approach because the names in tableData.ts
    // don't always exactly match tableFullContent.ts
    const matches = tableFullContent.filter(row => {
        const rowTopic = row.topic ? row.topic.toLowerCase() : '';
        const rowSubsection = row.subsection ? row.subsection.toLowerCase() : '';
        const rowSection = row.section.toLowerCase();

        // 1. If the row topic is contained in the study string (e.g., "Philosophy" in "Philosophy Apologetics")
        if (rowTopic && studyTopic.includes(rowTopic)) {
            return true;
        }

        // 2. Special case for "Bible Summary & Theology" -> matches "Summary" and "Theology"
        if (studyTopic.includes('bible summary') && rowTopic === 'summary') return true;
        if (studyTopic.includes('theology') && rowTopic === 'theology') return true;

        // 3. Special case for "Observation & Revelation"
        if (studyTopic.includes('observation') && rowTopic === 'observation') return true;
        if (studyTopic.includes('revelation') && rowTopic === 'revelation') return true;

        // 4. Special case for "Yielding"
        if (studyTopic.includes('yielding') && rowTopic === 'yield') return true;

        // 5. Special case for "Ethics and Traditions"
        if (studyTopic.includes('ethics') && rowTopic.includes('ethics')) return true;
        if (studyTopic.includes('traditions') && rowTopic.includes('traditions')) return true;

        // 6. Special case for "Habits and Organization"
        if (studyTopic.includes('habits') && rowSubsection.includes('habits')) return true;
        if (studyTopic.includes('organization') && rowSubsection.includes('organization')) return true;

        // 7. Special case for "Stewardship"
        if (studyTopic.includes('stewardship') && rowSubsection.includes('stewardship')) return true;

        return false;
    });

    // If we found matches, return them
    if (matches.length > 0) return matches;

    // Fallback: If no specific topic match, try to match by area/subsection if implied
    // (This is less precise, so we prefer the topic match above)

    return [];
}
