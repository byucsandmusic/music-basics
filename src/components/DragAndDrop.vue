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

//TODO ensure that this works properly on mobile devices
onDocReady(() => {
    const draggables = document.querySelector('.draggables')
    draggables.addEventListener('mousedown', (e: MouseEvent) => {
        const startingOffsetX = e.offsetX,
            startingOffsetY = e.offsetY
        const draggedElement = findParentWithClass(
            e.target as HTMLElement,
            'draggable'
        )
        const currentTranslate = getCurrentTranslate(draggedElement)
        const initX = e.pageX - currentTranslate.x,
            initY = e.pageY - currentTranslate.y

        console.log(currentTranslate)
        draggedElement.classList.add('dragging')

        function moveWithMouse(moveEvent: MouseEvent) {
            draggedElement.style.transform = `translate(${-(initX - moveEvent.pageX)}px, ${-(initY - moveEvent.pageY)}px)`
            const target = findParentWithClass(
                moveEvent.target as HTMLElement,
                'dragTarget'
            )
            if (target !== null)
                draggedElement.classList.add('hovering-over-valid-target')
            else draggedElement.classList.remove('hovering-over-valid-target')
            if (moveEvent.buttons % 2 !== 1) mouseReleased(moveEvent)
        }

        function mouseReleased(releaseEvent: MouseEvent) {
            const target = findParentWithClass(
                releaseEvent.target as HTMLElement,
                'dragTarget'
            )
            document.removeEventListener('mousemove', moveWithMouse)
            draggedElement.classList.remove(
                'dragging',
                'hovering-over-valid-target'
            )
            if (target === null) {
                //If a dragTarget was not ended on
                draggedElement.style.transform = ''
                return
            } else {
                console.log(releaseEvent)
                draggedElement.style.transform = `translate(${-(initX - releaseEvent.pageX - startingOffsetX + releaseEvent.offsetX)}px, ${-(initY - releaseEvent.pageY - startingOffsetY + releaseEvent.offsetY)}px)`
            }
        }

        document.addEventListener('mousemove', moveWithMouse)
    })
})
</script>

<template>
    <section>
        <div class="draggables">
            <span class="draggable">
                This is draggable <img src="https://picsum.photos/200" />
            </span>
        </div>
        <div class="targets">
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
    background-color: #b0bec5
</style>
