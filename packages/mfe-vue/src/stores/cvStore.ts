import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Project {
  title: string;
  period: string;
  description: string;
  url?: string;
}

export interface Education {
  degree: string;
  institution: string;
  years: string;
}

export const useCvStore = defineStore('cv', () => {
  const activeSection = ref('projects');
  const locale        = ref('es-CO');
  const mfeConnected  = ref(true);
  const commits       = ref(0);

  const projects = ref<Project[]>([
    {
      title: 'Entrelazos React App',
      period: 'Jan 2024 – Present',
      description: 'React + NestJS platform for a non-profit community business directory.',
    },
    {
      title: 'Lectio Divina Flutter App',
      period: 'Oct – Dec 2024',
      description: 'Flutter app for faith-based daily readings & reflection. Offline-first.',
    },
    {
      title: 'Lectio Divina PWA',
      period: 'Mar 2019 – Jan 2021',
      description: 'Progressive Web App built with Vue.js & Firebase. Live at haz-la-lectio.web.app',
      url: 'https://haz-la-lectio.web.app',
    },
    {
      title: 'Neurological Institute of Colombia',
      period: '2012',
      description: 'Java desktop app to standardize clinical histories, integrated with MySQL.',
    },
  ]);

  const education = ref<Education[]>([
    { degree: 'BS Systems & Computer Engineering', institution: 'University of Antioquia · Medellín', years: '2008–2015' },
    { degree: 'AA in Computer Engineering',        institution: 'Miami Dade College · Miami, FL',     years: '2004–2006' },
    { degree: 'High School Diploma',               institution: 'Dr Michael Krop Senior High School', years: '2004' },
  ]);

  const about = ref({
    paragraphs: [
      'Creative and detail-oriented Fullstack Developer with over 10 years of experience building responsive, scalable, and engaging web applications.',
      'Highly skilled in JavaScript/TypeScript (Vue.js, React.js, Node.js) and modern frameworks, with strong experience in API integration, UI/UX collaboration, and agile teamwork.',
      'Known for combining technical precision with design sensibility to deliver user-friendly and high-performing solutions.',
    ],
    openTo: ['Remote roles', 'Fullstack', 'Frontend Lead', 'Node.js', 'Tech Lead'],
  });

  function setSection(section: string) {
    activeSection.value = section;
    commits.value += 1;
  }

  function fetchProjects() {
    // Simulate async action
    commits.value += 1;
  }

  function broadcastEvent() {
    commits.value += 1;
    window.dispatchEvent(new CustomEvent('cv:ping-react'));
  }

  return {
    activeSection, locale, mfeConnected, commits,
    projects, education, about,
    setSection, fetchProjects, broadcastEvent,
  };
});
