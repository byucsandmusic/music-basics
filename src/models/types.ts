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
    bottom?: number
    left: number
    right?: number
    width?: number
    height?: number
}
