<script lang="ts">
import Translator from '../models/translator'
import { defineComponent } from 'vue'
import onDocReady from '../utils/domUtils'

export default defineComponent({
    name: 'DragAndDrop',
    props: {
        translator: Translator,
    },
})

function findParentWithClass(
    element: HTMLElement,
    goalClass: string
): HTMLElement | null {
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

//TODO consider changing these to a class
//TODO look into methods of getting touch events that work with safari
//TODO have drag items and targets generated from data
//TODO add callbacks for when items are dragged into targets
interface InteractionEvent {
    offsetX: number
    offsetY: number
    pageX: number
    pageY: number
    target: HTMLElement
    isBeingHeld: boolean
}

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

onDocReady(() => {
    const draggables = document.querySelector('.draggables') as HTMLElement
    addInputIndependentEventListener(
        draggables,
        'mousedown',
        'touchstart',
        dragStart
    )
})

function dragStart(e: InteractionEvent) {
    //Initialize data for drag event
    const startingOffsetX = e.offsetX,
        startingOffsetY = e.offsetY
    const draggedElement = findParentWithClass(
        e.target as HTMLElement,
        'draggable'
    )
    if (!draggedElement)
        throw new Error('Dragged element has no draggable parent')

    const currentTranslate = getCurrentTranslate(draggedElement)
    const initX = e.pageX - currentTranslate.x,
        initY = e.pageY - currentTranslate.y

    //Apply dragged class
    draggedElement.classList.add('dragging')
    const controller = new AbortController()
    addInputIndependentEventListener(
        document as unknown as HTMLElement,
        'mousemove',
        'touchmove',
        moveWithUser,
        controller
    )
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
        { once: true }
    )

    function moveWithUser(moveEvent: InteractionEvent) {
        if (!draggedElement)
            throw new Error('Dragged element has no draggable parent')
        draggedElement.style.transform = `translate(${-(initX - moveEvent.pageX)}px, ${-(initY - moveEvent.pageY)}px)`
        const target = findParentWithClass(
            moveEvent.target as HTMLElement,
            'dragTarget'
        )
        if (target !== null)
            draggedElement.classList.add('hovering-over-valid-target')
        else draggedElement.classList.remove('hovering-over-valid-target')
        if (!moveEvent.isBeingHeld) released(moveEvent)
    }

    function released(releaseEvent: InteractionEvent) {
        if (!draggedElement)
            throw new Error('Dragged element has no draggable parent')
        const target = findParentWithClass(
            releaseEvent.target as HTMLElement,
            'dragTarget'
        )
        controller.abort()

        draggedElement.classList.remove(
            'dragging',
            'hovering-over-valid-target'
        )
        if (target === null) {
            //If a dragTarget was not ended on
            draggedElement.style.transform = ''
            return
        } else {
            draggedElement.style.transform = `translate(${-(draggedElement.offsetLeft - target.offsetLeft)}px, ${-(draggedElement.offsetTop - target.offsetTop)}px)`
        }
    }
}
</script>

<template>
    <section>
        <div class="draggables">
            <span class="draggable">
                This is draggable <img src="https://picsum.photos/200" />
            </span>
            <span class="draggable">
                This, too is draggable <img src="https://picsum.photos/200" />
            </span>
        </div>
        <div class="targets">
            <span class="dragTarget"></span>
            <span class="dragTarget"></span>
        </div>
    </section>
</template>

<style lang="sass" scoped>
section
    color: black
    background-color: white
    padding: 10px

.dragging
    pointer-events: none
    transition: opacity 0.2s !important

.hovering-over-valid-target
    opacity: 0.5

.draggable
    display: inline-block
    border-radius: 10px
    padding: 10px
    outline: black 1px solid
    background-color: white
    transform: translate(0px, 0px)
    user-select: none
    transition: transform 0.2s, opacity 0.2s
    > *
        pointer-events: none

.dragTarget
    display: block
    width: 100px
    height: 100px
    outline: 1px solid black
    background-color: #b0bec5
</style>
