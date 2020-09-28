import { allLanguages } from './allLanguages'
import { getRandomLanguage } from './getRandomLanguage'

exports = {
    allLanguages,
    getRandomLanguage
} 

const chosenLanguage = getRandomLanguage();
console.log(`Your language for today is ${chosenLanguage.name}, this language code is ${chosenLanguage.code}`);