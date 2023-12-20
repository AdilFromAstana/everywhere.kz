import 'server-only';

type Dictionary = {
    [key: string]: () => Promise<any>; // Замените 'any' на тип вашего JSON
};

const dictionaries: Dictionary = {
    en: () => import('./en.json').then((module) => module.default),
    ru: () => import('./ru.json').then((module) => module.default),
    kz: () => import('./kz.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
