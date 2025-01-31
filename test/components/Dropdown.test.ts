import { shallowMount } from '@vue/test-utils'
import Dropdown from '../../src/components/Dropdown.vue'

let wrapper
const defaultProps = {
    items: [
        { id: 1, title: 'Item Title 1' },
        { id: 2, title: 'Item Title 2' },
    ],
    title: '',
}

const createWrapper = (props = defaultProps) =>
    shallowMount(Dropdown, { props })

afterAll(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

describe('the dropdown title', () => {
    it('is displayed as the title prop when the title prop is defined', () => {
        wrapper = createWrapper({
            title: 'Prop Title',
            items: defaultProps.items,
        })
        const title = wrapper.find('summary')
        expect(title.text()).toBe('Prop Title')
        expect(wrapper.vm.displayTitle).toBe('Item Title 1')
    })

    it('is set to the first item when the title prop is not defined', () => {
        wrapper = createWrapper()
        const title = wrapper.find('summary')
        expect(title.text()).toBe('Item Title 1')
        expect(wrapper.vm.displayTitle).toBe('Item Title 1')
    })

    it('is set to empty string when the title prop is not defined & items is an empty array', () => {
        wrapper = createWrapper({ items: [], title: defaultProps.title })
        const title = wrapper.find('summary')
        expect(title.text()).toBe('')
        expect(wrapper.vm.displayTitle).toBe('')
    })
})

describe('toggleSelected method', () => {
    it('does not change the displayed title when the title prop is defined', () => {
        wrapper = createWrapper({
            title: 'Prop Title',
            items: defaultProps.items,
        })
        let title = wrapper.find('summary')
        expect(title.text()).toBe('Prop Title')
        wrapper.vm.toggleSelected('New Title?')
        title = wrapper.find('summary')
        expect(title.text()).toBe('Prop Title')
    })

    it('does change the displayed title when a new item is selected and the title prop is not defined', () => {
        wrapper = createWrapper()
        expect(wrapper.vm.displayTitle).toBe('Item Title 1')
        wrapper.vm.toggleSelected('Item Title 2')
        expect(wrapper.vm.displayTitle).toBe('Item Title 2')
    })
})
