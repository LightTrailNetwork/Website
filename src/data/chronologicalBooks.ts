
export interface ChronologicalBook {
    id: string; // matches BibleBook.id usually
    name: string;
    era: string; // The historical era
    year?: string; // Approx date written
    order: number; // Chronological sequence
}

export const CHRONOLOGICAL_BOOKS: ChronologicalBook[] = [
    // Pre-Patriarchal / Job
    { id: "JcR1O_aQ3", name: "Job", era: "The Patriarchs", year: "Unknown (Early)", order: 1 },
    { id: "R6K5b_bL9", name: "Genesis", era: "The Patriarchs", year: "c. 1445-1405 BC", order: 2 },

    // Exodus & Law
    { id: "W4N9c_mP2", name: "Exodus", era: "Exodus & Conquest", year: "c. 1445-1405 BC", order: 3 },
    { id: "L8V2x_uJ7", name: "Leviticus", era: "Exodus & Conquest", year: "c. 1445-1405 BC", order: 4 },
    { id: "N3B6k_hT5", name: "Numbers", era: "Exodus & Conquest", year: "c. 1445-1405 BC", order: 5 },
    { id: "D9X7z_rF4", name: "Deuteronomy", era: "Exodus & Conquest", year: "c. 1445-1405 BC", order: 6 },
    { id: "P2M5n_yQ8", name: "Joshua", era: "Exodus & Conquest", year: "c. 1400-1370 BC", order: 7 },

    // Judges
    { id: "J5H8g_wS1", name: "Judges", era: "Era of Judges", year: "c. 1050-1000 BC", order: 8 },
    { id: "R1T4d_eV6", name: "Ruth", era: "Era of Judges", year: "c. 1000 BC", order: 9 },

    // The Kingdom (United)
    { id: "S9L2j_kH3", name: "1 Samuel", era: "The United Kingdom", year: "c. 930 BC", order: 10 },
    { id: "S4P7r_nA9", name: "2 Samuel", era: "The United Kingdom", year: "c. 930 BC", order: 11 },
    { id: "P3Z5m_qE2", name: "Psalms", era: "The United Kingdom", year: "c. 1440-586 BC", order: 12 }, // Spans many, but mostly Davidic
    { id: "S6B1v_lC8", name: "Song", era: "The United Kingdom", year: "c. 960 BC", order: 13 },
    { id: "P9Y2x_kR5", name: "Proverbs", era: "The United Kingdom", year: "c. 950-700 BC", order: 14 },
    { id: "E2R6t_nJ4", name: "Ecclesiastes", era: "The United Kingdom", year: "c. 935 BC", order: 15 },

    // The Kingdom (Divided - Early)
    { id: "K8N3f_gW7", name: "1 Kings", era: "The Divided Kingdom", year: "c. 550 BC", order: 16 },
    { id: "K5D9b_hM2", name: "2 Kings", era: "The Divided Kingdom", year: "c. 550 BC", order: 17 },

    // Prophets (Pre-Exilic) - Prophets to Israel (North)
    { id: "J0N4h_uL8", name: "Jonah", era: "Assyrian Period", year: "c. 770 BC", order: 18 },
    { id: "A7M2s_pD5", name: "Amos", era: "Assyrian Period", year: "c. 760 BC", order: 19 },
    { id: "H3O6s_qW1", name: "Hosea", era: "Assyrian Period", year: "c. 750-715 BC", order: 20 },

    // Prophets (Pre-Exilic) - Prophets to Judah (South)
    { id: "M4I9s_kE7", name: "Micah", era: "Assyrian Period", year: "c. 742-687 BC", order: 21 },
    { id: "I8S2h_nB4", name: "Isaiah", era: "Assyrian Period", year: "c. 740-680 BC", order: 22 },

    { id: "N6A2u_mP9", name: "Nahum", era: "Babylonian Period", year: "c. 663-612 BC", order: 23 },
    { id: "Z5E1p_hN3", name: "Zephaniah", era: "Babylonian Period", year: "c. 640-621 BC", order: 24 },
    { id: "H8B4k_rL6", name: "Habakkuk", era: "Babylonian Period", year: "c. 612-589 BC", order: 25 },
    { id: "J2E7r_mT5", name: "Jeremiah", era: "Babylonian Period", year: "c. 626-585 BC", order: 26 },
    { id: "L9A3m_sE1", name: "Lamentations", era: "Babylonian Period", year: "c. 586 BC", order: 27 },
    { id: "J4O8e_lC2", name: "Joel", era: "Babylonian Period", year: "c. 835 or 500s BC", order: 28 }, // Disputed, placed pre-exile usually or post

    // Exile
    { id: "O2B5d_iH7", name: "Obadiah", era: "The Exile", year: "c. 586 BC", order: 29 },
    { id: "E7Z3k_rN9", name: "Ezekiel", era: "The Exile", year: "c. 593-571 BC", order: 30 },
    { id: "D1A6n_lM4", name: "Daniel", era: "The Exile", year: "c. 605-530 BC", order: 31 },

    // Post-Exilic / Return
    { id: "C3H9r_oJ2", name: "1 Chronicles", era: "Return & Restoration", year: "c. 450 BC", order: 32 },
    { id: "C6H1r_oK5", name: "2 Chronicles", era: "Return & Restoration", year: "c. 450 BC", order: 33 },
    { id: "E8Z1r_aP7", name: "Ezra", era: "Return & Restoration", year: "c. 450 BC", order: 34 },
    { id: "N4E2h_mY6", name: "Nehemiah", era: "Return & Restoration", year: "c. 445-432 BC", order: 35 },
    { id: "E5S9t_hR3", name: "Esther", era: "Return & Restoration", year: "c. 483-473 BC (Events)", order: 36 },
    { id: "H2A5g_gI8", name: "Haggai", era: "Return & Restoration", year: "c. 520 BC", order: 37 },
    { id: "Z7E3c_hR4", name: "Zechariah", era: "Return & Restoration", year: "c. 520-480 BC", order: 38 },
    { id: "M9A1l_cH6", name: "Malachi", era: "Return & Restoration", year: "c. 430 BC", order: 39 },

    // New Testament - Gospels
    { id: "M8A2t_hE5", name: "Matthew", era: "The Gospels", year: "c. 50-60s AD", order: 40 }, // Order varies, Mark often first
    { id: "M1A6r_kL9", name: "Mark", era: "The Gospels", year: "c. 50s AD", order: 41 },
    { id: "L3U7k_eJ2", name: "Luke", era: "The Gospels", year: "c. 60 AD", order: 42 },
    { id: "J9O4h_nB1", name: "John", era: "The Gospels", year: "c. 85-90 AD", order: 43 },

    // Early Church History
    { id: "A2C5t_sH6", name: "Acts", era: "The Apostolic Age", year: "c. 60-62 AD", order: 44 },

    // Epistles (Approximate Chronological Order)
    { id: "J1A5m_eS8", name: "James", era: "Early Epistles", year: "c. 44-49 AD", order: 45 },
    { id: "G4A7l_aT9", name: "Galatians", era: "Early Epistles", year: "c. 49 AD", order: 46 },
    { id: "T1H3e_sS2", name: "1 Thessalonians", era: "Early Epistles", year: "c. 51 AD", order: 47 },
    { id: "T6H2e_sS5", name: "2 Thessalonians", era: "Early Epistles", year: "c. 51-52 AD", order: 48 },
    { id: "C8O3r_iN6", name: "1 Corinthians", era: "Mid Epistles", year: "c. 55 AD", order: 49 },
    { id: "C2O7r_iN1", name: "2 Corinthians", era: "Mid Epistles", year: "c. 56 AD", order: 50 },
    { id: "R9O2m_aN4", name: "Romans", era: "Mid Epistles", year: "c. 57 AD", order: 51 },

    // Prison Epistles
    { id: "P5H8i_lE3", name: "Philemon", era: "Prison Epistles", year: "c. 60-62 AD", order: 52 },
    { id: "C4O9l_oS7", name: "Colossians", era: "Prison Epistles", year: "c. 60-62 AD", order: 53 },
    { id: "E6P2h_eS1", name: "Ephesians", era: "Prison Epistles", year: "c. 60-62 AD", order: 54 },
    { id: "P7H4i_lP8", name: "Philippians", era: "Prison Epistles", year: "c. 60-62 AD", order: 55 },

    // Later / Pastoral
    { id: "T3I6m_oT2", name: "1 Timothy", era: "Pastoral Epistles", year: "c. 62-64 AD", order: 56 },
    { id: "T8I9t_uS5", name: "Titus", era: "Pastoral Epistles", year: "c. 62-64 AD", order: 57 },
    { id: "P2E4t_eR6", name: "1 Peter", era: "General Epistles", year: "c. 64-65 AD", order: 58 },
    { id: "T5I1m_oT9", name: "2 Timothy", era: "Pastoral Epistles", year: "c. 66-67 AD", order: 59 },
    { id: "P8E3t_eR1", name: "2 Peter", era: "General Epistles", year: "c. 67-68 AD", order: 60 },
    { id: "H5E9b_rW4", name: "Hebrews", era: "General Epistles", year: "c. 67-69 AD", order: 61 },
    { id: "J2U6d_eL7", name: "Jude", era: "General Epistles", year: "c. 68-70 AD", order: 62 },

    // John's Epistles & Revelation
    { id: "J1O5h_nL3", name: "1 John", era: "Johannine Era", year: "c. 85-90 AD", order: 63 },
    { id: "J7O2h_nL8", name: "2 John", era: "Johannine Era", year: "c. 85-90 AD", order: 64 },
    { id: "J4O9h_nL1", name: "3 John", era: "Johannine Era", year: "c. 85-90 AD", order: 65 },
    { id: "R3E7v_eL5", name: "Revelation", era: "Johannine Era", year: "c. 95 AD", order: 66 }
];

export const CHRONOLOGICAL_ERAS = [
    "The Patriarchs",
    "Exodus & Conquest",
    "Era of Judges",
    "The United Kingdom",
    "The Divided Kingdom",
    "Assyrian Period",
    "Babylonian Period",
    "The Exile",
    "Return & Restoration",
    "The Gospels",
    "The Apostolic Age",
    "Early Epistles",
    "Mid Epistles",
    "Prison Epistles",
    "Pastoral Epistles",
    "General Epistles",
    "Johannine Era"
];
