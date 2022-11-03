import {Circle, Figure, Rectangle, Triangle} from "./figure";

const DEFAULT_COLOR = '#FFFFFF'

class Canvas {
    private figures: Figure[];
    private background: string;

    constructor(background: string = DEFAULT_COLOR) {
        if (!this.validateHex(background)) {
            throw new Error('Invalid color')
        }
        this.figures = []
        this.background = background;
    }

    addFigure(figure: Rectangle | Circle | Triangle) {
        this.figures.push(figure)
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
        return [...this.figures]
    }

    getFigureCount(): number {
        return this.figures.length
    }

    remove(index: number): Figure | null {
        if (index < 0 || this.figures.length <= index) {
            return null
        }

        const deleted = this.figures.splice(index, 1)
        return deleted[0] || null
    }

    setColorForFigure(color: string, index: number): boolean {
        if (index < 0 || this.figures.length <= index || !this.validateHex(color)) {
            return false
        }

        this.figures[index].color = color
        return true
    }

    setColorForFigures(color: string): boolean {
        if (!this.validateHex(color)) {
            return false
        }

        this.figures.forEach(figure => figure.color = color)
        return true
    }

    clearFigures() {
        this.figures = [];
    }

    private validateHex(color: string) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color)
    }
}

export {
    Canvas,
}
