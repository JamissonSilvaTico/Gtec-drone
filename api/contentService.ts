
// --- MOCK SERVICE FOR HERO CONTENT ---
// In a real application, this file would make API calls to your backend.
// For this simulation, we use localStorage to persist the data.

import type { HeroContent } from '../types';

const HERO_CONTENT_KEY = 'gtecdrone_hero_content';

// Seed data from the original hardcoded Home.tsx content
const seedData: HeroContent = {
    mainTitle: "Gtec Drone",
    subtitle: "Topografia & Agrimensura",
    description: "Serviços de Topografia, Agrimensura e Georreferenciamento",
    buttonText: "Ligue Agora",
    buttonLink: "tel:+5569984318944",
    imageUrl: "https://images.pexels.com/photos/5473185/pexels-photo-5473185.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
};

const initializeHeroContent = () => {
    if (!localStorage.getItem(HERO_CONTENT_KEY)) {
        localStorage.setItem(HERO_CONTENT_KEY, JSON.stringify(seedData));
    }
};

initializeHeroContent();

const getHeroContentFromStorage = (): HeroContent => {
    const data = localStorage.getItem(HERO_CONTENT_KEY);
    return data ? JSON.parse(data) : seedData;
};

export const getHeroContent = async (): Promise<HeroContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getHeroContentFromStorage());
        }, 200);
    });
};

export const updateHeroContent = async (content: HeroContent): Promise<HeroContent> => {
    return new Promise(resolve => {
        setTimeout(() => {
            localStorage.setItem(HERO_CONTENT_KEY, JSON.stringify(content));
            resolve(content);
        }, 500);
    });
};
