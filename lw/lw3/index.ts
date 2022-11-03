import {Canvas} from "./canvas";

// const canvas = new Canvas()
// canvas.setBackground('grey');
// canvas.addRectangle(0, 0, 100, 100, 'red');
// canvas.addCircle(0, 0, 100, 'red');
// canvas.addTriangle(0, 0, 100, 100, 50, 'red');
//
// console.log(canvas.remove(2))
// console.log(canvas.getBackground())
// console.log(canvas.getFigureCount())
// canvas.setColorForFigures('yellow')
// console.log(canvas.getFigures())
// canvas.setColorForFigure('orange', 1)
// console.log(canvas.getFigures())
// canvas.clearFigures()

// addRectangle(x: number, y: number, width: number, height: number, color: string = DEFAULT_COLOR, rotate: number = 0): boolean {
//     if (!this.validateHex(color)) {
//         return false
//     }
//     const rectangle = {x, y, width, height, color, rotate, type: 'rectangle'};
//     this.figures.push(rectangle)
//     return true
// }
//
// addCircle(x: number, y: number, radius: number, color: string = DEFAULT_COLOR, rotate: number = 0): boolean {
//     if (!this.validateHex(color)) {
//         return false
//     }
//     const circle = {x, y, radius, color, rotate, type: 'circle'};
//     this.figures.push(circle)
//     return true
// }
//
// addTriangle(x: number, y: number, width: number, height: number, vertexOffset: number, color: string = DEFAULT_COLOR, rotate: number = 0): boolean {
//     if (!this.validateHex(color)) {
//         return false
//     }
//     const triangle = {x, y, width, height, vertexOffset, color, rotate, type: 'triangle'};
//     this.figures.push(triangle)
//     return true
// }

// ---

// it(`Добавление прямоугольника через функцию addRectangle`, () => {
//     const canvas = createCanvas()
//
//     const state = canvas.addRectangle(0, 0, 100, 100, '#FF0000')
//
//     expect(state).toBe(true)
//     expect(canvas.getFigures()[0]).toEqual({
//         x: 0,
//         y: 0,
//         width: 100,
//         height: 100,
//         color: '#FF0000',
//         rotate: 0,
//         type: 'rectangle',
//     })
// })

// it(`Добавление круга через функцию addCircle`, () => {
//     const canvas = createCanvas()
//
//     const state = canvas.addCircle(0, 0, 100, '#FF0000')
//
//     expect(state).toBe(true)
//     expect(canvas.getFigures()[0]).toEqual({
//         x: 0,
//         y: 0,
//         radius: 100,
//         color: '#FF0000',
//         rotate: 0,
//         type: 'circle',
//     })
// })

// it(`Добавление треугольника через функцию addTriangle`, () => {
//     const canvas = createCanvas()
//
//     const state = canvas.addTriangle(0, 0, 100, 100, 50, '#FF0000')
//
//     expect(state).toBe(true)
//     expect(canvas.getFigures()[0]).toEqual({
//         x: 0,
//         y: 0,
//         width: 100,
//         height: 100,
//         vertexOffset: 50,
//         color: '#FF0000',
//         rotate: 0,
//         type: 'triangle',
//     })
// })

// it(`Невалидные данные цвета при добавлении прямоугольника через функцию addRectangle`, () => {
//     const canvas = createCanvas()
//
//     const state = canvas.addRectangle(0, 0, 100, 100, '#FF00000')
//
//     expect(state).toBe(false)
//     expect(canvas.getFigureCount()).toBe(0)
// })
//
// it(`Невалидные данные цвета при добавление круга через функцию addCircle`, () => {
//     const canvas = createCanvas()
//
//     const state = canvas.addCircle(0, 0, 100, '#FF00000')
//
//     expect(state).toBe(false)
//     expect(canvas.getFigureCount()).toBe(0)
// })
//
// it(`Невалидные данные цвета при добавление треугольника через функцию addTriangle`, () => {
//     const canvas = createCanvas()
//
//     const state = canvas.addTriangle(0, 0, 100, 100, 50, '#FF00000')
//
//     expect(state).toBe(false)
//     expect(canvas.getFigureCount()).toBe(0)
// })

// TODO: Переформотировать: подготовка -> действия -> тестирование (структура unit тестов) +
// TODO: Пересмотреть названия тестов +
// TODO: Добавить невалидные данные width, height +
// TODO: Тест с добавлением нескольких фигур +
