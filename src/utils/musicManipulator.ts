import { Music } from '../models/types'

//Currently only affects treble, as I see no instances of anything else to work off of
export function subsheet(
    startVerse: number,
    verses: number,
    music: Music
): Music {
    if (verses < 1) throw new Error('subsheet must contain at least one verse')
    const newMusic: Music = JSON.parse(JSON.stringify(music))
    let verseCounter = 0
    const newLines: string[] = []
    if (!music.treble) return music

    for (let line of music.treble) {
        let currentLine = ''
        const splitLine = line.split('|')
        for (let verse of splitLine) {
            verseCounter++
            if (verseCounter > startVerse + verses) break
            if (verseCounter > startVerse)
                currentLine += (currentLine === '' ? '' : '|') + verse
        }
        if (currentLine === '') break
        newLines.push(currentLine)
    }
    newMusic.treble = newLines
    return newMusic
}

export function removeVerses(music: Music) {
    const newMusic: Music = JSON.parse(JSON.stringify(music))
    newMusic.verses = undefined
    return newMusic
}
