import { mount } from '@vue/test-utils'
import Tooltip from '../../../src/components/Interactive/Tooltip.vue'
import { beforeEach, expect } from 'vitest'
import { nextTick } from 'vue'

let wrapper
const defaultProps = {
    link: '',
    id: 'tooltipId',
    clickableRect: {
        top: 1,
        left: 1,
        width: 0,
        height: 0,
    },
}

const getDefaultProps = () => structuredClone(defaultProps)

const createWrapper = (props = defaultProps) => mount(Tooltip, { props })

beforeEach(() => {
    vi.stubGlobal('window', { location: { href: '/' } })
})

afterEach(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
    vi.unstubAllGlobals()
})

describe('handleClick', () => {
    let calcTooltipPlacementStub
    beforeEach(() => {
        wrapper = createWrapper()
        calcTooltipPlacementStub = vi
            .spyOn(wrapper.vm, 'calcTooltipPlacement')
            .mockImplementation(() => {})
    })

    afterEach(() => {
        calcTooltipPlacementStub.mockReset()
    })

    it('redirects when there is a link', async () => {
        const props = getDefaultProps()
        props.link = 'https://learningsuite.byu.edu'

        await wrapper.setProps(props)

        expect(window.location.href).toBe('/')
        wrapper.vm.handleClick()
        expect(window.location.href).toBe('https://learningsuite.byu.edu')
        expect(calcTooltipPlacementStub).not.toBeCalled()
    })

    it("does not redirect when there isn't a link", async () => {
        expect(window.location.href).toBe('/')
        wrapper.vm.handleClick()
        expect(window.location.href).toBe('/')
    })

    it('only emits before toggling true', () => {
        wrapper.vm.toggled = false

        wrapper.vm.handleClick()
        expect(wrapper.emitted()).toHaveProperty('close-others')
        expect(wrapper.emitted()['close-others']).toHaveLength(1)
        expect(wrapper.emitted()['close-others'][0][0]).toBe(wrapper.vm.id)

        expect(wrapper.vm.toggled).toBeTruthy()

        wrapper.vm.handleClick()
        expect(wrapper.emitted()['close-others']).toHaveLength(1)
    })

    it('calls calcTooltipPlacement after toggling true', async () => {
        wrapper.vm.toggled = false

        wrapper.vm.handleClick()
        await nextTick()
        expect(wrapper.vm.toggled).toBeTruthy()
        expect(calcTooltipPlacementStub).toBeCalled()
    })
})

it('calcTooltipPlacement destructures as expected', async () => {
    wrapper = createWrapper()
    await wrapper.setData({ toggled: true })

    const tooltip = wrapper.find('.tooltip')
    expect(tooltip.exists()).toBeTruthy()

    const mock = vi
        .spyOn(wrapper.vm.$refs.tooltip, 'getBoundingClientRect')
        .mockImplementation(() => ({
            top: 10,
            bottom: 20,
            left: 30,
            right: 40,
            innerWidth: 50,
            innerHeight: 60,
            width: 70,
            height: 80,
            scrollX: 90,
            scrollY: 100,
        }))

    expect(wrapper.vm.tooltipRect).toStrictEqual({})

    wrapper.vm.calcTooltipPlacement()
    expect(wrapper.vm.tooltipRect).toEqual({
        top: 10,
        left: 30,
        width: 70,
        height: 80,
    })
    expect(mock).toBeCalled()
})
