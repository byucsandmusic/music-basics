<script lang="ts">
import Translator from '../../models/translator'
import { defineComponent, useTemplateRef, PropType } from 'vue'
let el, onRelease, validBucket
const buckets = new Map<string, string | null>()

export interface DragReleaseEvent {
    source: string
    dest: string | null
}

interface InteractionEvent {
    offsetX: number
    offsetY: number
    pageX: number
    pageY: number
    target: HTMLElement
    isBeingHeld: boolean
}

/**
 * usage:
 *     This component can take children. Of its descendants, those that are the component types Draggable and DragTarget have special behavior. Draggables can be dragged into drag targets.
 *     Draggables and their targets are identified by their html ids.
 *     Avoid nesting draggables, targets, or DragAndDrop components, I don't know what happens but it's probably not good.
 *     This component uses a number of classes. It is best to avoid them in your own code, so as to not have any odd collisions. To be able to style them yourself, here they are:
 *         .hovering-over-valid-target: Only applied while currently being dragged over a valid target
 *         .draggable: Applied to all draggable elements, used in Draggable.vue to make draggables
 *         .dragTarget: Applied to all drag targets in DragTarget.vue
 *         .dragging: Applied to draggables currently being dragged.
 *     The styles contained in this component are fairly minimal to allow for more customization. To see the styles needed for a fully functional component, see DragAndDropDemo.vue
 *     To set what happens when a drag event happens, use the onRelease prop.
 *     To set what draggables can be put into what drag targets, use the validBucket prop.
 * props:
 *     onRelease: a function taking from and to strings and the state being a map with all previously used targets as keys, with their currently held draggables as values
 *     validBucket: a function taking from and to strings, and returning a boolean representing the validity of the source, target pair
 *
 *     Both of these props are optional, with the default behavior accepting all source, target pairs and doing nothing on release.
 */
export default defineComponent({
    name: 'DragAndDrop',
    props: {
        onRelease: {
            type: Function as PropType<(from: string, to: string | null, state: Map<string, string | null>) => void>,
            default: () => {},
        },
        validBucket: {
            type: Function as PropType<(from: string, to: string) => boolean>,
            default: () => {
                return true
            },
        },
    },
    data() {
        return {
            buckets: buckets,
        }
    },
    setup: (props) => {
        el = useTemplateRef('el')
        onRelease = props.onRelease
        validBucket = props.validBucket
    },
    mounted: () => {
        addInputIndependentEventListener(el.value, 'mousedown', 'touchstart', dragStart)
    },

    emits: ['dragReleased'],
})

function findParentWithClass(element: HTMLElement, goalClass: string): HTMLElement | null {
    if (element.parentNode === null) return null
    if (element.classList.contains(goalClass)) return element
    return findParentWithClass(element.parentNode as HTMLElement, goalClass)
}

//Currently only gets the values if the style only has a translate transform, and that translate has the format of <translate(xpx, ypx)>
function getCurrentTranslate(element: HTMLElement) {
    const transform = element.style.transform
    if (transform == '') return { x: 0, y: 0 }

    //Extract the number from the string
    const split = transform.split('px')
    return {
        x: Number(split[0].split('(')[1]),
        y: Number(split[1].split(' ')[1]),
    }
}

//Parses a mouse event into the InteractionEvent interface
function parseMouseEvent(e: MouseEvent): InteractionEvent {
    return {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target as HTMLElement,
        isBeingHeld: e.buttons % 2 == 1,
    }
}

//Parses a touch event into the InteractionEvent interface
function parseTouchEvent(e: TouchEvent): InteractionEvent {
    return {
        offsetX: e.changedTouches[0].clientX,
        offsetY: e.changedTouches[0].clientY,
        pageX: e.changedTouches[0].pageX,
        pageY: e.changedTouches[0].pageY,
        target: e.target as HTMLElement,
        isBeingHeld: true,
    }
}

//Adds an event listener for a mouse and touch event
function addInputIndependentEventListener(
    element: HTMLElement,
    mouseEvent: string,
    touchEvent: string,
    handler: Function,
    controller?: AbortController
) {
    element.addEventListener(
        mouseEvent,
        (e: MouseEvent) => {
            handler(parseMouseEvent(e))
        },
        { signal: controller?.signal }
    )
    element.addEventListener(
        touchEvent,
        (e: TouchEvent) => {
            handler(parseTouchEvent(e))
        },
        { signal: controller?.signal }
    )
}

function dragStart(e: InteractionEvent) {
    //Initialize data for drag event
    const draggedElement = findParentWithClass(e.target as HTMLElement, 'draggable')
    if (!draggedElement) return

    const currentTranslate = getCurrentTranslate(draggedElement)
    const initX = e.pageX - currentTranslate.x,
        initY = e.pageY - currentTranslate.y

    //Apply dragged class
    draggedElement.classList.add('dragging')

    //Create controller to cancel unneeded event listeners
    const controller = new AbortController()

    //Handle mouse or finger move inputs, putting them into moveWithUser
    addInputIndependentEventListener(
        document as unknown as HTMLElement,
        'mousemove',
        'touchmove',
        moveWithUser,
        controller
    )

    //todo make items on screen resize and reposition as necessary when a window is resized
    //Handle mouse / finger being lifted
    document.addEventListener(
        'touchend',
        (e: TouchEvent) => {
            let touch = e.changedTouches[0]
            let target = document.elementFromPoint(touch.pageX, touch.pageY)

            released({
                offsetX: 0,
                offsetY: 0,
                pageX: touch.pageX,
                pageY: touch.pageY,
                target: target as HTMLElement,
                isBeingHeld: false,
            })
        },
        { once: true, signal: controller.signal }
    )
    document.addEventListener('mouseup', (e: MouseEvent) => released(parseMouseEvent(e)), { signal: controller.signal })

    //Move the dragged element with the user's finger / cursor
    function moveWithUser(moveEvent: InteractionEvent) {
        if (!draggedElement) throw new Error('Dragged element has no draggable parent')
        window.getSelection()?.removeAllRanges()
        draggedElement.style.transform = `translate(${-(initX - moveEvent.pageX)}px, ${-(initY - moveEvent.pageY)}px)`
        const target = findParentWithClass(moveEvent.target as HTMLElement, 'dragTarget')
        if (target !== null) draggedElement.classList.add('hovering-over-valid-target')
        else draggedElement.classList.remove('hovering-over-valid-target')
        if (!moveEvent.isBeingHeld) released(moveEvent)
    }

    //Align element to its new position and trigger callbacks when it is released
    function released(releaseEvent: InteractionEvent) {
        if (!draggedElement) throw new Error('Dragged element has no draggable parent')
        const target = findParentWithClass(releaseEvent.target as HTMLElement, 'dragTarget')
        controller.abort()

        draggedElement.classList.remove('dragging', 'hovering-over-valid-target')
        function getBucket(id: string) {
            let prior: string | null = null
            for (let [key, val] of buckets.entries()) {
                if (val == draggedElement?.id) {
                    prior = key
                    break
                }
            }
            return prior
        }
        function invalidRelease() {
            draggedElement!.style.transform = ''
            const prior = getBucket(draggedElement!.id)
            if (prior) buckets.set(prior, null)
            onRelease(draggedElement!.id, target?.id, new Map(buckets))
        }
        if (target === null) {
            //If a dragTarget was not ended on
            invalidRelease()
        } else {
            if (validBucket(draggedElement.id, target.id) && !buckets.get(target.id)) {
                draggedElement.style.transform = `translate(${-(draggedElement.offsetLeft - target.offsetLeft)}px, ${-(draggedElement.offsetTop - target.offsetTop)}px)`
                const prior = getBucket(draggedElement!.id)
                if (prior) buckets.set(prior, null)
                buckets.set(target!.id, draggedElement!.id)
                onRelease(draggedElement.id, target.id, new Map(buckets))
            } else {
                invalidRelease()
            }
        }
    }
}
</script>

<template>
    <section ref="el">
        <slot></slot>
    </section>
</template>

<style lang="sass">
.dragging
    pointer-events: none
    z-index: 100 !important

.draggable
    z-index: 0
    position: relative

    transform: translate(0px, 0px)
    user-select: none
    transition: transform 0.2s, opacity 0.2s, z-index 0.2s
    touch-action: none

    *
        touch-action: none
</style>
