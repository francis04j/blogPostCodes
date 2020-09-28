import { allLanguages } from './allLanguages'
import { Language } from './language'

export const getRandomLanguage = () => {
    if(allLanguages && allLanguages.length > 0) {
        return allLanguages[Math.floor(Math.random() * allLanguages.length)];
    }
    return new Language('None', '0')
}