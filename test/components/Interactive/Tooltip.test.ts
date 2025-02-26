import { mount } from '@vue/test-utils'
import Tooltip from '../../../src/components/Exploration/Tooltip.vue'
import { expect } from 'vitest'

let wrapper
const defaultProps = {
    clickableRect: {
        top: 1,
        left: 1,
        width: 0,
        height: 0,
    },
    item: {
        key: 'item',
        title: 'Item',
    },
}

const createWrapper = (props = defaultProps) =>
    mount(Tooltip, { props, global: { stubs: { CloseIcon: true } } })

afterEach(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

it('handleClick emits as expected', () => {
    wrapper = createWrapper()
    expect(wrapper.emitted()).not.toHaveProperty('toggle')

    wrapper.vm.handleClick()

    expect(wrapper.emitted()).toHaveProperty('toggle')
    expect(wrapper.emitted()['toggle']).toHaveLength(1)
})

it('calcTooltipPlacement destructures as expected', () => {
    wrapper = createWrapper()

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

    expect(wrapper.vm.tooltipRect).toStrictEqual({
        top: 0,
        width: 0,
        left: 0,
        height: 0,
    })

    wrapper.vm.calcTooltipPlacement()
    expect(wrapper.vm.tooltipRect).toEqual({
        top: 10,
        left: 30,
        width: 70,
        height: 80,
    })
    expect(mock).toBeCalled()
})
