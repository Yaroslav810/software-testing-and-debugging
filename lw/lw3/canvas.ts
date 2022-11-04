import {Circle, Figure, Rectangle, Triangle} from "./figure"
import {Storage} from "./storage"

const DEFAULT_COLOR = '#FFFFFF'

class Canvas {
    private figures: Storage;
    private background: string;

    constructor(storage: Storage, background: string = DEFAULT_COLOR) {
        if (!this.validateHex(background)) {
            throw new Error('Invalid color')
        }
        this.figures = storage;
        this.background = background;
    }

    addFigure(figure: Rectangle | Circle | Triangle) {
        this.figures.add(figure)
    }

    setBackground(background: string): boolean {
        if (this.validateHex(background)) {
            this.background = background
            return true
        }
        return false
    }

    getBackground(): string {
        return this.background
    }

    getFigures(): Figure[] {
        return this.figures.getAll()
    }

    getFigureCount(): number {
        return this.figures.getCount()
    }

    remove(index: number): Figure | null {
        if (index < 0 || this.figures.getCount() <= index) {
            return null
        }

        const deleted = this.figures.get(index)
        this.figures.remove(index)
        return deleted || null
    }

    setColorForFigure(color: string, index: number): boolean {
        if (index < 0 || this.figures.getCount() <= index || !this.validateHex(color)) {
            return false
        }

        this.figures.get(index).color = color
        return true
    }

    setColorForFigures(color: string): boolean {
        if (!this.validateHex(color)) {
            return false
        }

        this.figures.getAll().forEach(figure => figure.color = color)
        return true
    }

    clearFigures() {
        this.figures.clear();
    }

    private validateHex(color: string) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color)
    }
}

export {
    Canvas,
}
