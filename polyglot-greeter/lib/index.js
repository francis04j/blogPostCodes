"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allLanguages_1 = require("./allLanguages");
var getRandomLanguage_1 = require("./getRandomLanguage");
exports = {
    allLanguages: allLanguages_1.allLanguages,
    getRandomLanguage: getRandomLanguage_1.getRandomLanguage
};
var chosenLanguage = getRandomLanguage_1.getRandomLanguage();
console.log("Your language for today is " + chosenLanguage.name + ", this language code is " + chosenLanguage.code);
