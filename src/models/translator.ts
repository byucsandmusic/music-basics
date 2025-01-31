import { languages } from './languages'

export default class Translator {
    language: string = ''

    /**
     * A translator that can retrieve text from the language.ts file based on the set language
     * @param language a string representing the language to be used by the translator
     */
    constructor(language: string) {
        this.language = language
    }

    /**
     * Change the language used by the translator
     * @param language a string representing the language to be used by the translator
     */
    setLanguage(language: string) {
        this.language = language
    }

    /**
     * @param path a list of strings denoting the path to the desired text in languages
     * @returns the desired text in the current language,
     * the desired text in English if the current language is invalid,
     * or undefined if the path is incorrect
     */
    get(...path: string[]) {
        let temp = languages
        for (const key of path) {
            temp = temp[key]
            if (temp === undefined) return temp
        }
        return temp[this.language] || temp['EN']
    }
}
