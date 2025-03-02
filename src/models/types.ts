export interface DropdownItem {
    id: string | number
    title?: string
}

export interface LinkItem extends DropdownItem {
    href: string
    notInMenu?: boolean
}

export type Cursor = {
    onStart: () => void
    onEvent: (event: any) => void
    onFinished: () => void
}

export interface BoundingRect {
    top: number
    left: number
    width: number
    height: number
    bottom?: number
    right?: number
}

export type Music = {
    title?: string
    meter?: string
    beat?: string
    tempo?: string
    key?: string
    instrument?: number
    treble?: string[]
    bass?: string[]
    verses?: string[][]
}

export enum ConfettiShapes {
    circle = 'circle',
    square = 'square',
    star = 'star',
}

export type ConfettiOptions = {
    particleCount?: number
    angle?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    drift?: number
    flat?: boolean
    ticks?: number
    origin?: {
        x?: number
        y?: number
    }
    colors?: string[]
    shapes?: ConfettiShapes[]
    scalar?: number
    zIndex?: number
    disableForReducedMotion?: boolean
}
