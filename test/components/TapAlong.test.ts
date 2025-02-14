import { mount } from '@vue/test-utils'
import TapAlong from '../../src/components/TapAlong.vue'

vi.stubGlobal(
    'AudioContext',
    vi.fn().mockImplementation(() => ({
        createOscillator: vi.fn(() => ({
            connect: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
            frequency: { setValueAtTime: vi.fn() },
        })),
        createGain: vi.fn(() => ({
            connect: vi.fn(),
            gain: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        })),
        destination: {},
    }))
)

describe('TapAlong Component', () => {
    let wrapper
    const mockTranslator = {
        get: vi.fn((...args) => args.join('.')),
    }

    beforeEach(() => {
        wrapper = mount(TapAlong, {
            props: {
                translator: mockTranslator,
                rhythm: [1, 1, 1, 1],
            },
        })
    })

    it('should initialize correctly', () => {
        expect(wrapper.vm.playing).toBe(false)
        expect(wrapper.vm.canTap).toBe(false)
    })

    it('should correctly process taps within tolerance', async () => {
        wrapper.vm.bpm = 480
        wrapper.vm.tolerance = 40
        const beatDuration = (60 / wrapper.vm.bpm) * 1000
        wrapper.vm.play()

        await new Promise((resolve) =>
            setTimeout(resolve, 12 * beatDuration + 20)
        )

        for (let i = 0; i < wrapper.vm.expectedTapsData.length; i++) {
            wrapper.vm.tap()
            await new Promise((resolve) =>
                setTimeout(resolve, wrapper.vm.expectedTapsData[i])
            )
        }

        console.log(wrapper.vm.tapResults)

        expect(wrapper.vm.tapResults.every((result) => result === 1)).toBe(true)
    }, 20000)

    it('should register incorrect taps outside tolerance', async () => {
        wrapper.vm.bpm = 480
        wrapper.vm.tolerance = 40
        const beatDuration = (60 / wrapper.vm.bpm) * 1000
        wrapper.vm.play()

        await new Promise((resolve) =>
            setTimeout(resolve, 12 * beatDuration + 40)
        )

        for (let i = 0; i < wrapper.vm.expectedTapsData.length; i++) {
            wrapper.vm.tap()
            await new Promise((resolve) =>
                setTimeout(resolve, wrapper.vm.expectedTapsData[i])
            )
        }

        expect(wrapper.vm.tapResults.every((result) => result === 0)).toBe(true)
    }, 20000)
})
