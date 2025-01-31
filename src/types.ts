export interface DropdownItem {
    id: string | number
    title: string
}

export interface LinkItem extends DropdownItem {
    href: string
}
