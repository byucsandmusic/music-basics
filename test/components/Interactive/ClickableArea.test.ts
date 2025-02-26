import { shallowMount } from '@vue/test-utils'
import ClickableArea from '../../../src/components/Exploration/ClickableArea.vue'
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

const getDefaultProps = () => structuredClone(defaultProps)

const createWrapper = (props = defaultProps) =>
    shallowMount(ClickableArea, { props })

afterEach(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

describe('hasBody', () => {
    it('returns false when expected', async () => {
        wrapper = createWrapper()
        expect(wrapper.vm.hasBody).toBeFalsy()

        const props = getDefaultProps()
        props.item['body'] = ''
        await wrapper.setProps(props)
        expect(wrapper.vm.hasBody).toBeFalsy()
    })

    it('returns true when expected', () => {
        const props = getDefaultProps()
        props.item['body'] = 'A sizeable paragraph'
        wrapper = createWrapper(props)
        expect(wrapper.vm.hasBody).toBeTruthy()
    })
})

describe('componentType', () => {
    it('returns "Tooltip" when expected', async () => {
        wrapper = createWrapper()
        expect(wrapper.vm.componentType).toBe('Tooltip')

        const props = defaultProps
        props.item['body'] = ''
        await wrapper.setProps(props)
        expect(wrapper.vm.componentType).toBe('Tooltip')
    })

    it('returns "Sidebar" when expected', () => {
        const props = getDefaultProps()
        props.item['body'] = 'A somewhat lengthy paragraph'
        wrapper = createWrapper(props)
        expect(wrapper.vm.componentType).toBe('Sidebar')
    })
})

it('close only sets toggled to false', () => {
    wrapper = createWrapper()
    wrapper.vm.toggled = true
    expect(wrapper.vm.toggled).toBeTruthy()

    wrapper.vm.close()
    expect(wrapper.vm.toggled).toBeFalsy()

    wrapper.vm.close()
    expect(wrapper.vm.toggled).toBeFalsy()
})

it('handleToggle only emits before toggling true', () => {
    wrapper = createWrapper()
    wrapper.vm.toggled = false

    wrapper.vm.handleToggle()
    expect(wrapper.emitted()).toHaveProperty('close-others')
    expect(wrapper.emitted()['close-others']).toHaveLength(1)
    expect(wrapper.emitted()['close-others'][0][0]).toBe(wrapper.vm.id)

    expect(wrapper.vm.toggled).toBeTruthy()

    wrapper.vm.handleToggle()
    expect(wrapper.emitted()['close-others']).toHaveLength(1)
})
