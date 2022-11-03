import {Canvas} from "./canvas";

function createCanvasCreated(background?: string) {
    return () => createCanvas(background)
}

function createRectangle(figure) {
    return {
        ...figure,
        width: 100,
        height: 100
    }
}

function createCircle(figure) {
    return {
        ...figure,
        radius: 100
    }
}

function createTriangle(figure) {
    return {
        ...figure,
        width: 100,
        height: 100,
        vertexOffset: 50
    }
}

function createFigure(type: 'rectangle' | 'circle' | 'triangle') {
    let result = {
        type,
        x: 0,
        y: 0,
        rotate: 0,
        color: '#FF00FF',
    }
    switch (type) {
        case "rectangle":
            return createRectangle(result)
        case "circle":
            return createCircle(result)
        case "triangle":
            return createTriangle(result)
    }
}

function createCanvas(background?: string, figures?: ('rectangle' | 'circle' | 'triangle')[]) {
    const canvas = background
        ? new Canvas(background)
        : new Canvas()
    if (figures) {
        figures.forEach(figure => canvas.addFigure(createFigure(figure)))
    }
    return canvas
}

describe('Тестирование canvas', () => {

    it('Дефолтная инициализация canvas', () => {
        const canvas = createCanvas()

        expect(canvas.getBackground()).toBe('#FFFFFF')
        expect(canvas.getFigureCount()).toBe(0)
    })

    it(`Валидная установка background через конструктор`, () => {
        const canvas1 = createCanvas('#C0C0C0')
        const canvas2 = createCanvas('#FFF')

        expect(canvas1.getBackground()).toBe('#C0C0C0')
        expect(canvas2.getBackground()).toBe('#FFF')
    })

    it(`Валидная установка background через функцию`, () => {
        const canvas1 = createCanvas()
        const canvas2 = createCanvas()

        canvas1.setBackground('#C0C0C0')
        canvas2.setBackground('#FFF')

        expect(canvas1.getBackground()).toBe('#C0C0C0')
        expect(canvas2.getBackground()).toBe('#FFF')
    })

    it(`Невалидная установка background через конструктор`, () => {
        const error = 'Invalid color'
        expect(createCanvasCreated('#C0C0C00')).toThrow(error)
        expect(createCanvasCreated('#FF')).toThrow(error)
        expect(createCanvasCreated('bus')).toThrow(error)
    })

    it(`Невалидная установка background через функцию`, () => {
        const canvas = createCanvas()

        const background1 = canvas.setBackground('#C0C0C00')
        const background2 = canvas.setBackground('#FF')
        const background3 = canvas.setBackground('bus')

        expect(background1).toBe(false)
        expect(background2).toBe(false)
        expect(background3).toBe(false)
        expect(canvas.getBackground()).toBe('#FFFFFF')
    })

    it(`Добавление прямоугольника через addFigure`, () => {
        const canvas = createCanvas()
        const rectangle = createFigure('rectangle')

        canvas.addFigure(rectangle)

        expect(canvas.getFigures()[0]).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'rectangle',
        })
    })

    it(`Добавление круга через addFigure`, () => {
        const canvas = createCanvas()
        const circle = createFigure('circle')

        canvas.addFigure(circle)

        expect(canvas.getFigures()[0]).toEqual({
            x: 0,
            y: 0,
            radius: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'circle',
        })
    })

    it(`Добавление треугольника через addFigure`, () => {
        const canvas = createCanvas()
        const triangle = createFigure('triangle')

        canvas.addFigure(triangle)

        expect(canvas.getFigures()[0]).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            vertexOffset: 50,
            color: '#FF00FF',
            rotate: 0,
            type: 'triangle',
        })
    })

    it(`Добавление нескольких фигур`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        expect(canvas.getFigureCount()).toBe(3)
        expect(canvas.getFigures()[0]).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'rectangle',
        })
        expect(canvas.getFigures()[1]).toEqual({
            x: 0,
            y: 0,
            radius: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'circle',
        })
        expect(canvas.getFigures()[2]).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            vertexOffset: 50,
            color: '#FF00FF',
            rotate: 0,
            type: 'triangle',
        })
    })

    it(`Удаление одной фигуры`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const beforeCount = canvas.getFigureCount()
        const figure = canvas.remove(0)
        const afterCount = canvas.getFigureCount()

        expect(beforeCount).toBe(3)
        expect(figure).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'rectangle',
        })
        expect(afterCount).toBe(2)
    })

    it(`Удаление нескольких фигур`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const firstCount = canvas.getFigureCount()
        const figure1 = canvas.remove(0)
        const secondCount = canvas.getFigureCount()
        const figure2 = canvas.remove(1)
        const thirdCount = canvas.getFigureCount()

        expect(firstCount).toBe(3)
        expect(figure1).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'rectangle',
        })
        expect(secondCount).toBe(2)
        expect(figure2).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            vertexOffset: 50,
            color: '#FF00FF',
            rotate: 0,
            type: 'triangle',
        })
        expect(thirdCount).toBe(1)
    })

    it(`Невалидный индекс при удаление фигуры`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const bigIndexRemove = canvas.remove(3)
        const smallIndexRemove = canvas.remove(-1)

        expect(bigIndexRemove).toBe(null)
        expect(smallIndexRemove).toBe(null)
        expect(canvas.getFigureCount()).toBe(3)
    })

    it(`Установка цвета определённой фигуры`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const state = canvas.setColorForFigure('#00FFFF', 0)

        expect(state).toBe(true)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#00FFFF', '#FF00FF', '#FF00FF'])
    })

    it(`Невалидная установка цвета определённой фигуры`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const state = canvas.setColorForFigure('#00FFFFF', 0)

        expect(state).toBe(false)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#FF00FF', '#FF00FF', '#FF00FF'])
    })

    it(`Невалидный индекс при установке цвета определённой фигуры`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const state = canvas.setColorForFigure('#00FFFF', 3)

        expect(state).toBe(false)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#FF00FF', '#FF00FF', '#FF00FF'])
    })

    it(`Установка цвета фигурам`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const state = canvas.setColorForFigures('#00FFFF')

        expect(state).toBe(true)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#00FFFF', '#00FFFF', '#00FFFF'])
    })

    it(`Невалидная установка цвета фигурам`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        const state = canvas.setColorForFigures('#00FFFFF')

        expect(state).toBe(false)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#FF00FF', '#FF00FF', '#FF00FF'])
    })

    it(`Удаление фигур на пустом canvas`, () => {
        const canvas = createCanvas()

        canvas.clearFigures()

        expect(canvas.getFigureCount()).toBe(0)
    })

    it(`Удаление фигур на заполненом canvas`, () => {
        const canvas = createCanvas(null, ['rectangle', 'circle', 'triangle'])

        canvas.clearFigures()

        expect(canvas.getFigureCount()).toBe(0)
    })
})
