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
