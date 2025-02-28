import { mount } from '@vue/test-utils'
import Exploration from '../../src/pages/basic/Exploration.vue'
import Translator from '../../src/models/translator'
import ClickableArea from '../../src/components/Exploration/ClickableArea.vue'

let wrapper
const defaultProps = {
    translator: new Translator(),
}

const createWrapper = (props = defaultProps) =>
    mount(Exploration, {
        props,
        computed: {
            clickables() {
                return [
                    { key: 'closer', title: 'Closer Title' },
                    { key: 'keeper', title: 'Keeper Title' },
                ]
            },
        },
        stubs: {
            Tooltip: ClickableArea,
        },
    })

afterAll(() => {
    if (wrapper) {
        wrapper.unmount()
        wrapper = null
    }
})

it('closeOtherTooltips calls close on other toolTips', () => {
    wrapper = createWrapper()
    const keeperSpy = vi.spyOn(wrapper.vm.$refs.keeper_tooltip[0], 'close')
    const closerSpy = vi.spyOn(wrapper.vm.$refs.closer_tooltip[0], 'close')

    wrapper.vm.closeOtherTooltips('keeper')

    expect(keeperSpy).not.toBeCalled()
    expect(closerSpy).toBeCalledTimes(1)
})
