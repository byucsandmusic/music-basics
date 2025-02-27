import { shallowMount } from '@vue/test-utils'
import TapAlong from '../../src/components/TapAlong.vue'
import Translator from '../../src/models/translator'

let wrapper

// Mocked data
const mockRhythmTimes = [0, 500, 1000, 1500]
const createMockElement = () => ({
    classList: {
        classes: [],
        add: function (className: string) {
            if (!this.classes.includes(className)) {
                this.classes.push(className)
            }
        },
    },
    addedClass: '',
})
const mockRhythmElements = [
    [createMockElement()],
    [createMockElement()],
    [createMockElement()],
    [createMockElement()],
]

// Create a wrapper for the TapAlong component
// This function is called before each test to set up the component
// with the necessary props and data.
const createWrapper = () => {
    wrapper = shallowMount(TapAlong, {
        props: {
            translator: new Translator(),
            rhythm: {
                title: 'Mixed Rhythm',
                meter: '4/4',
                tempo: '100',
                beat: '1/4',
                treble: ['BB/B/BB'],
                instrument: 36,
            },
        },
        data() {
            return {
                isTest: true,
                rhythmTimes: mockRhythmTimes as never[],
                rhythmElements: mockRhythmElements as never[],
                playing: true,
                canTap: true,
            }
        },
    })
}

afterAll(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

describe('TapAlong component', () => {
    it('should correctly handle a sequence of correct taps', async () => {
        createWrapper()

        const correctTaps = mockRhythmTimes.map((time) => time + 50)

        for (let tapTime of correctTaps) {
            wrapper.vm.tap(tapTime)
        }

        expect(wrapper.vm.tapResults).toEqual([1, 1, 1, 1])

        mockRhythmElements.forEach((element) => {
            expect(element[0].classList.classes).toContain('abcjs-note_correct')
        })
    })

    it('should correctly handle a sequence of incorrect taps', async () => {
        createWrapper()

        const incorrectTaps = mockRhythmTimes.map((time) => time + 250)

        for (let tapTime of incorrectTaps) {
            wrapper.vm.tap(tapTime)
        }

        expect(wrapper.vm.tapResults).toEqual([0, 0, 0, 0])

        mockRhythmElements.forEach((element) => {
            expect(element[0].classList.classes).toContain(
                'abcjs-note_incorrect'
            )
        })
    })
})
