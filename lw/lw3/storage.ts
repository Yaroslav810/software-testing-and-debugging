import {Figure} from "./figure"

interface Storage {
    add(figure: Figure): void

    remove(): Figure

    get(index: number): Figure

    getAll(): Figure[]

    getCount(): number
}

export {
    Storage,
}
