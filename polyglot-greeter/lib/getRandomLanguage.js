"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomLanguage = void 0;
var allLanguages_1 = require("./allLanguages");
var language_1 = require("./language");
exports.getRandomLanguage = function () {
    if (allLanguages_1.allLanguages && allLanguages_1.allLanguages.length > 0) {
        return allLanguages_1.allLanguages[Math.floor(Math.random() * allLanguages_1.allLanguages.length)];
    }
    return new language_1.Language('None', '0');
};
