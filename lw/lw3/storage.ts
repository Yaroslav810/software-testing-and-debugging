import {Figure} from "./figure"

interface Storage {
    add(figure: Figure): void

    remove(index: number): void

    get(index: number): Figure

    getAll(): Figure[]

    getCount(): number

    clear(): void
}

export {
    Storage,
}
