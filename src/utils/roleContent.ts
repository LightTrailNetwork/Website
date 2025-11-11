import { Role } from '../data/types';

interface RoleContent {
  morning: {
    title: string;
    activities: string[];
    focus?: string;
  };
  afternoon: {
    title: string;
    content: string;
    reference?: string;
  };
  night: {
    title: string;
    activity: string;
    details?: string;
  };
}

// Get role-specific content for the M.A.N. schedule
export function getRoleContent(role: Role): RoleContent {
  const baseContent: RoleContent = {
    morning: {
      title: 'W.O.R.S.H.I.P.',
      activities: [
        'Worship Song',
        'Offer Yourself to God',
        'Read (Bible Chapter)',
        'Silence (2 minutes)',
        'Hear and Journal',
        'Intercession (A.N.C.H.O.R.)',
        'Practical Action'
      ],
    },
    afternoon: {
      title: 'Memorization',
      content: 'John 3:16',
      reference: '"For God so loved the world that he gave his one and only Son..."'
    },
    night: {
      title: 'Study',
      activity: 'Book of Romans Chapter 1',
      details: 'Focus on Paul\'s introduction and the gospel\'s power'
    }
  };

  switch (role) {
    case Role.PRE_SCOUT:
      return {
        ...baseContent,
        morning: {
          ...baseContent.morning,
          focus: 'Observe and learn the rhythm'
        },
        afternoon: {
          title: 'Review',
          content: 'Previous passages review',
          reference: 'Review last 3 memorized verses'
        },
        night: {
          title: 'Preparation',
          activity: 'Introduction to Mentorship Basics',
          details: 'Understanding the triad model and your future role'
        }
      };

    case Role.SCOUT:
      return {
        ...baseContent,
        morning: {
          ...baseContent.morning,
          focus: 'Preparing for mentee role'
        },
        afternoon: {
          title: 'Memorization',
          content: 'Romans 8:28',
          reference: '"And we know that in all things God works for the good..."'
        },
        night: {
          title: 'Study',
          activity: 'Leadership Preparation',
          details: 'Learning from the mentor\'s example and preparing for next quarter'
        }
      };

    case Role.MENTEE:
      return {
        ...baseContent,
        night: {
          title: 'Fellowship & Study',
          activity: 'Connect with Mentor',
          details: 'Tuesday/Thursday evening calls + personal Bible study'
        }
      };

    case Role.MENTOR:
      return {
        ...baseContent,
        afternoon: {
          title: 'Memorization',
          content: 'Ephesians 4:11-13',
          reference: '"To equip the saints for the work of ministry..."'
        },
        night: {
          title: 'Mentoring & Study',
          activity: 'Guide Mentee + Advanced Study',
          details: 'Lead mentee sessions and deeper theological study'
        }
      };

    case Role.STEWARD:
      return {
        ...baseContent,
        afternoon: {
          title: 'Memorization',
          content: '1 Peter 5:2-3',
          reference: '"Shepherd God\'s flock that is under your care..."'
        },
        night: {
          title: 'Stewardship',
          activity: 'Oversee Triad + Strategic Planning',
          details: 'Guide mentors, plan service projects, coordinate with other stewards'
        }
      };

    default:
      return baseContent;
  }
}

// Get role display information
export function getRoleInfo(role: Role) {
  const roleInfo = {
    [Role.PRE_SCOUT]: {
      name: 'Pre-Scout',
      description: 'Preparing to enter the triad',
      color: 'gray',
      level: 'Preparatory'
    },
    [Role.SCOUT]: {
      name: 'Scout',
      description: 'Learning and observing',
      color: 'blue',
      level: 'Preparatory'
    },
    [Role.MENTEE]: {
      name: 'Mentee',
      description: 'Being mentored and growing',
      color: 'green',
      level: 'Core Triad'
    },
    [Role.MENTOR]: {
      name: 'Mentor',
      description: 'Leading and teaching',
      color: 'yellow',
      level: 'Core Triad'
    },
    [Role.STEWARD]: {
      name: 'Steward',
      description: 'Overseeing and guiding',
      color: 'purple',
      level: 'Core Triad'
    }
  };

  return roleInfo[role];
}

// Get role progression path
export function getNextRole(currentRole: Role): Role | null {
  const progression: Record<Role, Role | null> = {
    [Role.PRE_SCOUT]: Role.SCOUT,
    [Role.SCOUT]: Role.MENTEE,
    [Role.MENTEE]: Role.MENTOR,
    [Role.MENTOR]: Role.STEWARD,
    [Role.STEWARD]: null // Graduates out
  };

  return progression[currentRole];
}