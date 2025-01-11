import { getCookie } from './getCookie';

export function getNameLanguage(value?: any): 'nameKz' | 'nameEn' | 'nameRu' {
    let userLang;
    if (value) {
        userLang = value;
    } else {
        userLang = getCookie('UserLang');
    }
    if (userLang === 'Kk') {
        return 'nameKz';
    } else if (userLang === 'En') {
        return 'nameEn';
    } else {
        return 'nameRu';
    }
}
