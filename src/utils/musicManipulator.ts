import { Music } from '../models/types'

//Currently only affects treble, as I see no instances of anything else to work off of. It also merges all lines into one line.
export function subsheet(startVerse: number, verses: number, music: Music): Music {
    if (verses < 1) throw new Error('subsheet must contain at least one verse')
    const newMusic: Music = JSON.parse(JSON.stringify(music))
    let verseCounter = 0
    const newLines: string[] = []
    if (!music.treble) return music

    let currentLine = ''
    const splitLine = music.treble.join('').split('|')
    console.log(splitLine)

    for (let verse of splitLine) {
        verseCounter++
        if (verseCounter > startVerse + verses) break
        if (verseCounter > startVerse) currentLine += (currentLine === '' ? '' : '|') + verse
    }
    newMusic.treble = [currentLine]
    return newMusic
}

export function removeVerses(music: Music) {
    const newMusic: Music = JSON.parse(JSON.stringify(music))
    newMusic.verses = undefined
    return newMusic
}

export function removeTitle(music: Music) {
    const newMusic: Music = JSON.parse(JSON.stringify(music))
    newMusic.title = undefined
    return newMusic
}

export function isolateSheet(music: Music) {
    return removeVerses(removeTitle(music))
}
