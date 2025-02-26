import { shallowMount } from '@vue/test-utils'
import ClickableArea from '../../../src/components/Interactive/ClickableArea.vue'
import Sidebar from '../../../src/components/Interactive/Sidebar.vue'
import { expect } from 'vitest'

let wrapper
const defaultProps = {
    item: {
        key: 'item',
        title: 'Item',
    },
}

const createWrapper = (props = defaultProps) => shallowMount(Sidebar, { props })

afterEach(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

it('handleClose emits as expected', () => {
    wrapper = createWrapper()
    expect(wrapper.emitted()).not.toHaveProperty('toggle')

    wrapper.vm.handleClose()

    expect(wrapper.emitted()).toHaveProperty('toggle')
    expect(wrapper.emitted()['toggle']).toHaveLength(1)
})
