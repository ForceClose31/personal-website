import { writable } from 'svelte/store';

export interface TechStackItem {
  icon: string;
  name: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  solves: string[];
  status: string;
  techStack: TechStackItem[];
  links: ProjectLinks;
  image?: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Backend Roompi',
    description: 'This coding is the backend of a mobile application called roompi, this backend uses Laravel to be used as an API which will later be integrated into the mobile application.',
    solves: ['API Application', 'Course Application', 'Backend Roompi'],
    status: 'Completed',
    techStack: [
      { icon: 'php', name: 'PHP' },
      { icon: 'laravel', name: 'Laravel' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/backend-roompi.git'
    },
    image: 'https://play-lh.googleusercontent.com/saDCIVTLBu7rZofJ9FypwO7KAQnZdEIcbWd-1wI5lZh_XIGliSm2noTUlGvqvK9Gws4=w480-h960-rw'
  },
  {
    id: '2',
    title: 'Mantab',
    description: 'This great application is aimed at sheep farmers, where in this application farmers can monitor their sheep in an organized and regular manner.',
    solves: ['Mobile Application', 'Farmer Application', 'Flutter Project'],
    status: 'Completed',
    techStack: [
      { icon: 'flutter', name: 'Flutter' },
      { icon: 'dart', name: 'Dart' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/Mantab.git'
    },
    image: 'https://github.com/ForceClose31/template/blob/main/Sempol%20Sejahtera%201.png?raw=true'
  },
  {
    id: '3',
    title: 'Subur',
    description: 'This Subur application is used by rice farmers so they can detect diseases in their rice plants and carry out early treatment and prevention on their rice plants.',
    solves: ['Mobile Application', 'Farmer Application', 'Machine Learning Integration'],
    status: 'Completed',
    techStack: [
      { icon: 'kotlin', name: 'Kotlin' },
      { icon: 'python', name: 'Python' },
      { icon: 'express', name: 'Express JS' }
    ],
    links: {
      live: 'https://youtube.com/shorts/8Nr7qW2GpMg?si=4WWVD0_ej_Y6kO3X',
      github: 'https://github.com/ForceClose31/subur.git'
    },
    image: 'https://github.com/ForceClose31/subur/blob/main/Group%201.png?raw=true'
  },
  {
    id: '4',
    title: 'Si-Klinik',
    description: 'Si-Klinik is a health website for health workers at the Jember Paru clinic, where on this website health workers can record patients, determine the type of disease, medication, and medical record history.',
    solves: ['Website Development', 'PHP', 'Medical Website'],
    status: 'Completed',
    techStack: [
      { icon: 'js', name: 'JavaScript' },
      { icon: 'laravel', name: 'Laravel' },
      { icon: 'php', name: 'PHP' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/si-klinik.git'
    },
    image: 'https://github.com/ForceClose31/template/blob/main/s200_klinik%201.png?raw=true'
  },
  {
    id: '5',
    title: 'Sortcoff',
    description: 'Sortcoff is a mobile application integrated with IOT with the function of sorting coffee beans according to color and size. This application is intended for coffee bean farmers who still have difficulty sorting their coffee beans.',
    solves: ['Mobile Application', 'Farmer Application', 'IOT Integration'],
    status: 'Completed',
    techStack: [
      { icon: 'flutter', name: 'Flutter' },
      { icon: 'dart', name: 'Dart' },
      { icon: 'cpp', name: 'C++' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/sortcoff.git'
    },
    image: 'https://github.com/ForceClose31/template/blob/main/Sort_Coff-removebg-preview%201.png?raw=true'
  },
  {
    id: '6',
    title: 'API Easy Vote',
    description: 'This Easy Vote API is used for the Easy Vote website and is integrated with blockchain with the aim of making the backend of this website implement the concept of decentralization when users vote on nominated candidates.',
    solves: ['API Integration', 'Blockchain', 'Backend Development'],
    status: 'Completed',
    techStack: [
      { icon: 'express', name: 'Express JS' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/api-easy-vote.git'
    },
    image: 'https://alexanderfo.com/wp-content/uploads/2019/12/1139px-Cloud-API-Logo.svg_.png'
  },
  {
    id: '7',
    title: 'HardHat Easy Vote',
    description: 'This is a continuation of the Easy Vote API where in this project there is a smart contract integrated with the blockchain using hardhat and solidity for the smart contract.',
    solves: ['Blockchain', 'Smart Contract', 'Solidity'],
    status: 'Completed',
    techStack: [
      { icon: 'js', name: 'Javascript' },
      { icon: 'solidity', name: 'Solidity' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/easy-vote-hardhat.git'
    },
    image: 'https://raw.githubusercontent.com/codetesla51/web-site-files/main/images/fc1943b8-2cde-409e-b3a9-b6f5b7129ecf.jpeg'
  },
  {
    id: '8',
    title: 'Linguabond',
    description: 'This application is used for English courses for children. This application also has a face-to-face meeting feature with a mentor and there is also a point system.',
    solves: ['Mobile Application', 'Course Application', 'Flutter Project'],
    status: 'Completed',
    techStack: [
      { icon: 'flutter', name: 'Flutter' },
      { icon: 'dart', name: 'Dart' }
    ],
    links: {
      github: 'https://github.com/ForceClose31/linguabond.git'
    },
    image: 'https://github.com/ForceClose31/template/blob/main/snapedit_1711770890291-removebg-preview%208.png?raw=true'
  }
];

function createProjectsStore() {
  let initial = INITIAL_PROJECTS;
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('personal_portfolio_projects');
    if (saved) {
      try {
        initial = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse projects from localStorage', e);
      }
    }
  }

  const { subscribe, set, update } = writable<Project[]>(initial);

  return {
    subscribe,
    addProject: (project: Omit<Project, 'id'>) => {
      update((list) => {
        const newProj: Project = { ...project, id: Date.now().toString() };
        const updated = [newProj, ...list];
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('personal_portfolio_projects', JSON.stringify(updated));
        }
        return updated;
      });
    },
    updateProject: (id: string, updatedData: Partial<Project>) => {
      update((list) => {
        const updated = list.map((item) => (item.id === id ? { ...item, ...updatedData } : item));
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('personal_portfolio_projects', JSON.stringify(updated));
        }
        return updated;
      });
    },
    deleteProject: (id: string) => {
      update((list) => {
        const updated = list.filter((item) => item.id !== id);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('personal_portfolio_projects', JSON.stringify(updated));
        }
        return updated;
      });
    },
    resetToDefault: () => {
      set(INITIAL_PROJECTS);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('personal_portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
      }
    }
  };
}

export const projectsStore = createProjectsStore();
