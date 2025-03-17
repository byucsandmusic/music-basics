import { shallowMount } from '@vue/test-utils'
import MusicNotation from '../../src/components/MusicNotation.vue'
import { Music } from '../../src/models/types'
import Translator from '../../src/models/translator'

let wrapper
const defaultMusicObj: Music = {
    title: 'Test',
    meter: '4/4',
    beat: '1/4',
    tempo: '95',
    key: 'C',
    treble: ['C'],
    bass: ['C'],
    verses: [['Lyric']],
}

const createWrapper = (music?: Music) =>
    shallowMount(MusicNotation, {
        props: {
            music: music ?? defaultMusicObj,
            displayMidiPlayer: false,
            translator: new Translator(),
        },
    })

afterAll(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

describe('construct notation method', () => {
    it('should display all music pieces in proper order when they are part of music prop', () => {
        wrapper = createWrapper()
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('T:Test\nM:4/4\nL:1/4\nQ:95\nK:C\nV:1\nC\nw:Lyric\nV:2 clef=bass\nC\n')
    })

    it('should put bass as V:1 if treble is not defined', () => {
        const musicProp: Music = {
            bass: ['C'],
            verses: [['Lyric']],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('V:1 clef=bass\nC\nw:Lyric\n')
    })

    it('should put bass as V:1 if treble is empty', () => {
        const musicProp: Music = {
            treble: [],
            bass: ['C'],
            verses: [['Lyric']],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('V:1 clef=bass\nC\nw:Lyric\n')
    })

    it('should alternate treble and bass if there are multiple lines', () => {
        const musicProp: Music = {
            treble: ['C', 'D'],
            bass: ['C', 'D'],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('V:1\nC\nV:2 clef=bass\nC\nV:1\nD\nV:2 clef=bass\nD\n')
    })

    it('should alternate treble, lyrics, and bass if there are multiple lines', () => {
        const musicProp: Music = {
            treble: ['C', 'D'],
            bass: ['C', 'D'],
            verses: [
                ['One', 'Two'],
                ['Three', 'Four'],
            ],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe(
            'V:1\nC\nw:1.~One\nw:2.~Three\nV:2 clef=bass\nC\nV:1\nD\nw:Two\nw:Four\nV:2 clef=bass\nD\n'
        )
    })

    it('should not display midi player when displayMidiPlayer is false', () => {
        wrapper = createWrapper()
        const midiPlayer = wrapper.find('#midi-player')
        expect(midiPlayer.exists()).toBe(true)
        expect(midiPlayer.text()).toBe('')
    })
})
