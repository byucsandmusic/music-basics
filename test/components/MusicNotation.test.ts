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
        expect(notation).toBe('T:Test\nM:4/4\nL:1/4\nQ:95\nK:C\nV:Treble\nC\nw:Lyric\nV:Bass clef=bass middle=D\nC\n')
    })

    it('should put bass on top if treble is not defined', () => {
        const musicProp: Music = {
            bass: ['C'],
            verses: [['Lyric']],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('V:Bass clef=bass middle=D\nC\nw:Lyric\n')
    })

    it('should put bass on top if treble is empty', () => {
        const musicProp: Music = {
            treble: [],
            bass: ['C'],
            verses: [['Lyric']],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('V:Bass clef=bass middle=D\nC\nw:Lyric\n')
    })

    it('should alternate treble and bass if there are multiple lines', () => {
        const musicProp: Music = {
            treble: ['C', 'D'],
            bass: ['C', 'D'],
        }
        wrapper = createWrapper(musicProp)
        const notation: string = wrapper.vm.constructNotation()
        expect(notation).toBe('V:Treble\nC\nV:Bass clef=bass middle=D\nC\nV:Treble\nD\nV:Bass clef=bass middle=D\nD\n')
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
            'V:Treble\nC\nw:1.~One\nw:2.~Three\nV:Bass clef=bass middle=D\nC\nV:Treble\nD\nw:Two\nw:Four\nV:Bass clef=bass middle=D\nD\n'
        )
    })

    it('should not display midi player when displayMidiPlayer is false', () => {
        wrapper = createWrapper()
        const midiPlayer = wrapper.find('#midi-player')
        expect(midiPlayer.exists()).toBe(true)
        expect(midiPlayer.text()).toBe('')
    })
})
