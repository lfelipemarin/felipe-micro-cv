import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  comment: string;
  items: { label: string; highlight?: 'r' | 'v' | 'p' }[];
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

const THEMES = ['dark', 'light', 'system'] as const;

export interface CvState {
  activeSection: string;
  theme: string;
  themeIdx: number;
  mfeConnected: boolean;
  dispatches: number;
  experience: Experience[];
  skills: SkillGroup[];
  contact: Contact;
}

const initialState: CvState = {
  activeSection: 'experience',
  theme: 'dark',
  themeIdx: 0,
  mfeConnected: true,
  dispatches: 0,

  contact: {
    email:     'lfelipe.marin@gmail.com',
    phone:     '+57 301 4369634',
    linkedin:  'https://www.linkedin.com/in/fmv85',
    github:    'https://github.com/lfelipemarin',
    portfolio: 'https://lfelipemarin.github.io/hooked-up',
  },

  experience: [
    {
      company: 'Brandlive',
      role: 'Software Engineer',
      period: 'Mar 2025 – Present',
      bullets: [
        'Maintain and develop new features in a core software module',
        'React 19 + Node.js performance & UX enhancements',
        'Cross-functional team collaboration & integration delivery',
      ],
    },
    {
      company: '6Connex',
      role: 'Application Engineer',
      period: 'Jul 2018 – Present',
      bullets: [
        'Virtual Events Platform maintenance & feature delivery',
        'Led architecture & full migration to Vue.js',
        'Scalable front-end architecture & performance optimization',
      ],
    },
    {
      company: 'Demand Frontier',
      role: 'Software Developer',
      period: 'Jun 2015 – Jul 2018',
      bullets: [
        'Internal portal (Vue.js frontend · Node.js backend)',
        'Marketo, Eloqua, HubSpot, Pardot API integrations',
        'Email campaigns & landing pages for corporate clients',
      ],
    },
  ],

  skills: [
    {
      category: 'Frontend',
      comment: '// frontend',
      items: [
        { label: 'React 19', highlight: 'r' },
        { label: 'Vue.js 3', highlight: 'v' },
        { label: 'TypeScript', highlight: 'r' },
        { label: 'JavaScript' },
        { label: 'Tailwind' },
        { label: 'Flutter' },
        { label: 'Bootstrap' },
      ],
    },
    {
      category: 'State',
      comment: '// state management',
      items: [
        { label: 'Redux', highlight: 'p' },
        { label: 'Pinia', highlight: 'v' },
        { label: 'Vuex' },
        { label: 'Context API' },
      ],
    },
    {
      category: 'Backend & Infra',
      comment: '// backend & infra',
      items: [
        { label: 'Node.js' },
        { label: 'NestJS' },
        { label: 'Express' },
        { label: 'Java / Spring' },
        { label: 'AWS' },
        { label: 'GCP' },
        { label: 'Firebase' },
        { label: 'RabbitMQ' },
      ],
    },
    {
      category: 'Databases',
      comment: '// databases',
      items: [
        { label: 'MySQL' },
        { label: 'MongoDB' },
        { label: 'PostgreSQL' },
        { label: 'Redis' },
        { label: 'NeDB' },
      ],
    },
  ],
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    toggleTheme(state) {
      state.themeIdx = (state.themeIdx + 1) % THEMES.length;
      state.theme = THEMES[state.themeIdx];
    },
    incrementDispatches(state) {
      state.dispatches += 1;
    },
  },
});

export const { setActiveSection, toggleTheme, incrementDispatches } = cvSlice.actions;
export default cvSlice.reducer;
