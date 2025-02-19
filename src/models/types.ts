export interface DropdownItem {
    id: string | number
    title: string
}

export interface LinkItem extends DropdownItem {
    href: string
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
