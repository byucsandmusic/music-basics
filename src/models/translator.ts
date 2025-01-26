import { languages } from './languages.ts'

export default class Translator {
  language:string = ''

  constructor(language:string) {
    this.language = language
  }

  /**
   * @param path an array of strings pointing to the desired text in languages
   * @returns the desired text in the current language
   */
  get(path:Array<string>) {
    let temp = languages
    for (const key of path) {
      temp = temp[key]
    }
    return temp[this.language]
  }
}