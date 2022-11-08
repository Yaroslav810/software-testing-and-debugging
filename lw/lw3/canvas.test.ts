import {Canvas} from "./canvas"
import {Storage} from "./storage"
import {Figure} from "./figure"

function createMockStorage(figures: Figure[], figuresForGet?: Figure[]) {
    let count = figures.length
    return {
        add: jest.fn(() => {
            count++
        }),
        remove: jest.fn(() => {
            count--
        }),
        get: jest.fn(() => figuresForGet.shift()),
        getAll: jest.fn(() => figures),
        getCount: jest.fn(() => count),
        clear: jest.fn(() => {
            count = 0
        })
    }
}

function createCanvasCreated(storage: Storage, background?: string) {
    return () => createCanvas(storage, background)
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

function createFigures(figures: ('rectangle' | 'circle' | 'triangle')[]) {
    return figures.map(createFigure)
}

function createCanvas(storage: Storage, background?: string) {
    return background
        ? new Canvas(storage, background)
        : new Canvas(storage)
}

describe('Тестирование canvas', () => {

    it('Дефолтная инициализация canvas', () => {
        const storage = createMockStorage(createFigures([]))
        const canvas = createCanvas(storage)

        expect(canvas.getBackground()).toBe('#FFFFFF')
        expect(canvas.getFigureCount()).toBe(0)
    })

    it(`Валидная установка background через конструктор`, () => {
        const storage = createMockStorage(createFigures([]))
        const canvas1 = createCanvas(storage, '#C0C0C0')
        const canvas2 = createCanvas(storage, '#FFF')

        expect(canvas1.getBackground()).toBe('#C0C0C0')
        expect(canvas2.getBackground()).toBe('#FFF')
    })

    it(`Валидная установка background через функцию`, () => {
        const storage = createMockStorage(createFigures([]))
        const canvas1 = createCanvas(storage)
        const canvas2 = createCanvas(storage)

        canvas1.setBackground('#C0C0C0')
        canvas2.setBackground('#FFF')

        expect(canvas1.getBackground()).toBe('#C0C0C0')
        expect(canvas2.getBackground()).toBe('#FFF')
    })

    it(`Невалидная установка background через конструктор`, () => {
        const storage = createMockStorage(createFigures([]))
        const error = 'Invalid color'

        expect(createCanvasCreated(storage, '#C0C0C00')).toThrow(error)
        expect(createCanvasCreated(storage, '#FF')).toThrow(error)
        expect(createCanvasCreated(storage, 'bus')).toThrow(error)
    })

    it(`Невалидная установка background через функцию`, () => {
        const storage = createMockStorage(createFigures([]))
        const canvas = createCanvas(storage)

        const background1 = canvas.setBackground('#C0C0C00')
        const background2 = canvas.setBackground('#FF')
        const background3 = canvas.setBackground('bus')

        expect(background1).toBe(false)
        expect(background2).toBe(false)
        expect(background3).toBe(false)
        expect(canvas.getBackground()).toBe('#FFFFFF')
    })

    it(`Добавление прямоугольника через addFigure`, () => {
        const storage = createMockStorage([])
        const canvas = createCanvas(storage)
        const rectangle = createFigure('rectangle')

        canvas.addFigure(rectangle)

        expect(storage.add.mock.calls.length).toBe(1)
        expect(storage.add.mock.calls[0]).toEqual([{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'rectangle',
        }])
    })

    it(`Добавление круга через addFigure`, () => {
        const storage = createMockStorage([])
        const canvas = createCanvas(storage)
        const circle = createFigure('circle')

        canvas.addFigure(circle)

        expect(storage.add.mock.calls.length).toBe(1)
        expect(storage.add.mock.calls[0]).toEqual([{
            x: 0,
            y: 0,
            radius: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'circle',
        }])
    })

    it(`Добавление треугольника через addFigure`, () => {
        const storage = createMockStorage([])
        const canvas = createCanvas(storage)
        const triangle = createFigure('triangle')

        canvas.addFigure(triangle)

        expect(storage.add.mock.calls.length).toBe(1)
        expect(storage.add.mock.calls[0]).toEqual([{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            vertexOffset: 50,
            color: '#FF00FF',
            rotate: 0,
            type: 'triangle',
        }])
    })

    it(`Добавление нескольких фигур`, () => {
        const storage = createMockStorage([])
        const canvas = createCanvas(storage)

        canvas.addFigure(createFigure('rectangle'))
        canvas.addFigure(createFigure('circle'))
        canvas.addFigure(createFigure('triangle'))

        expect(storage.add.mock.calls.length).toBe(3)
        expect(storage.add.mock.calls[0]).toEqual([{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'rectangle',
        }])
        expect(storage.add.mock.calls[1]).toEqual([{
            x: 0,
            y: 0,
            radius: 100,
            color: '#FF00FF',
            rotate: 0,
            type: 'circle',
        }])
        expect(storage.add.mock.calls[2]).toEqual([{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            vertexOffset: 50,
            color: '#FF00FF',
            rotate: 0,
            type: 'triangle',
        }])
    })

    it(`Удаление одной фигуры`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']), [createFigure('rectangle')])
        const canvas = createCanvas(storage)

        canvas.getFigureCount()
        canvas.remove(0)
        canvas.getFigureCount()

        expect(storage.remove.mock.calls.length).toBe(1)
        expect(storage.remove.mock.calls[0]).toEqual([0])

        expect(storage.getCount.mock.calls.length).toBe(3)
        expect(storage.getCount.mock.results[0].value).toBe(3)
        expect(storage.getCount.mock.results[2].value).toBe(2)
    })

    it(`Удаление нескольких фигур`, () => {
        const storage = createMockStorage(
            createFigures(['rectangle', 'circle', 'triangle']),
            [
                createFigure('rectangle'),
                createFigure('triangle'),
            ],
        )
        const canvas = createCanvas(storage)

        canvas.getFigureCount()
        canvas.remove(0)
        canvas.getFigureCount()
        canvas.remove(1)
        canvas.getFigureCount()

        expect(storage.remove.mock.calls.length).toBe(2)
        expect(storage.remove.mock.calls[0]).toEqual([0])
        expect(storage.remove.mock.calls[1]).toEqual([1])

        expect(storage.getCount.mock.calls.length).toBe(5)
        expect(storage.getCount.mock.results[0].value).toBe(3)
        expect(storage.getCount.mock.results[2].value).toBe(2)
        expect(storage.getCount.mock.results[4].value).toBe(1)
    })

    it(`Невалидный индекс при удаление фигуры`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']))
        const canvas = createCanvas(storage)

        canvas.remove(3)
        canvas.remove(-1)

        expect(storage.getCount.mock.calls.length).toBe(1)
        expect(storage.getCount.mock.results[0].value).toBe(3)

        expect(storage.get.mock.calls.length).toBe(0)
        expect(storage.remove.mock.calls.length).toBe(0)
    })

    it(`Установка цвета определённой фигуры`, () => {
        const storage = createMockStorage(
            [
                {
                    ...createFigure('triangle'),
                    color: '#00FFFF',
                },
                createFigure('circle'),
                createFigure('triangle'),
            ],
            [
                createFigure('rectangle'),
            ]
        )
        const canvas = createCanvas(storage)

        const state = canvas.setColorForFigure('#00FFFF', 0)

        expect(storage.get.mock.calls.length).toBe(1)
        expect(storage.get.mock.calls[0]).toEqual([0])
        expect(storage.get.mock.results[0].value).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: '#00FFFF',
            rotate: 0,
            type: 'rectangle',
        })
        expect(state).toBe(true)
    })

    it(`Невалидная установка цвета определённой фигуры`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']))
        const canvas = createCanvas(storage)

        const state = canvas.setColorForFigure('#00FFFFF', 0)

        expect(storage.get.mock.calls.length).toBe(0)
        expect(state).toBe(false)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#FF00FF', '#FF00FF', '#FF00FF'])
    })

    it(`Невалидный индекс при установке цвета определённой фигуры`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']))
        const canvas = createCanvas(storage)

        const state = canvas.setColorForFigure('#00FFFF', 3)

        expect(storage.get.mock.calls.length).toBe(0)
        expect(state).toBe(false)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#FF00FF', '#FF00FF', '#FF00FF'])
    })

    it(`Установка цвета фигурам`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']))
        const canvas = createCanvas(storage)

        const state = canvas.setColorForFigures('#00FFFF')

        expect(storage.getAll.mock.calls.length).toBe(1)
        expect(storage.getAll.mock.results[0].value.map(({color}) => color)).toEqual(['#00FFFF', '#00FFFF', '#00FFFF'])
        expect(state).toBe(true)
    })

    it(`Невалидная установка цвета фигурам`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']))
        const canvas = createCanvas(storage)

        const state = canvas.setColorForFigures('#00FFFFF')

        expect(storage.getAll.mock.calls.length).toBe(0)
        expect(state).toBe(false)
        expect(canvas.getFigures().map(({color}) => color)).toEqual(['#FF00FF', '#FF00FF', '#FF00FF'])
    })

    it(`Удаление фигур на пустом canvas`, () => {
        const storage = createMockStorage([])
        const canvas = createCanvas(storage)

        canvas.clearFigures()

        expect(storage.clear.mock.calls.length).toBe(1)
    })

    it(`Удаление фигур на заполненом canvas`, () => {
        const storage = createMockStorage(createFigures(['rectangle', 'circle', 'triangle']))
        const canvas = createCanvas(storage)

        canvas.clearFigures()

        expect(storage.clear.mock.calls.length).toBe(1)
    })
})
