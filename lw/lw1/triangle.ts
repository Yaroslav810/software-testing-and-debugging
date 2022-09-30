const PRECISION = 12

type InputData = {
    a: number,
    b: number,
    c: number,
}

type TriangleType = 'ordinary'   // Обычный
    | 'isosceles'                // Равнобедренный
    | 'equilateral'              // Равносторонний
    | 'not_triangle'             // Не треугольник
    | 'unknown_error'            // Неизвестная ошибка

const TYPES = ['ordinary', 'isosceles', 'equilateral', 'not_triangle', 'unknown_error']

function strip(n: number): number {
    return parseFloat(n.toPrecision(PRECISION))
}

function getInputData(data: string[]): (InputData | 'unknown_error') {
    if (data.length !== 3) {
        return 'unknown_error'
    }
    const [_a, _b, _c] = data
    const [a, b, c] = [_a, _b, _c].map(parseFloat)
    const checkA = Number.isNaN(a) ? false : a
    const checkB = Number.isNaN(b) ? false : b
    const checkC = Number.isNaN(c) ? false : c
    if (checkA === false || checkB === false || checkC === false) {
        return 'unknown_error'
    }
    return {
        a,
        b,
        c,
    }
}

function checkBoundaryValues(data: InputData): boolean {
    const result = Object.values(data).filter(item =>
        item === Number.POSITIVE_INFINITY || item === Number.NEGATIVE_INFINITY)

    return !result.length
}

function determineTypeOfTriangle(data: InputData | 'unknown_error'): TriangleType {
    if (data === 'unknown_error' || !checkBoundaryValues(data)) {
        return 'unknown_error'
    }
    const dataAsc = Object.values(data).sort((a, b) => b - a)
    const [_a, _b, _c] = dataAsc
    const [a, b, c] = [strip(_a), strip(_b), strip(_c)]

    if (strip(a - b) >= c) {
        return 'not_triangle'
    }

    if (a === b && b === c) {
        return 'equilateral'
    }

    if ((a === b) || (b === c) || (a === c)) {
        return 'isosceles'
    }

    return 'ordinary'
}

function getTriangleTypeText(type: TriangleType) {
    switch (type) {
        case "ordinary":
            return 'Обычный'
        case "isosceles":
            return 'Равнобедренный'
        case "equilateral":
            return 'Равносторонний'
        case "not_triangle":
            return 'Не треугольник'
        case "unknown_error":
            return "Неизвестная ошибка"
        default:
            throw new Error()
    }
}

export {
    TYPES,

    InputData,
    TriangleType,

    getInputData,
    determineTypeOfTriangle,
    getTriangleTypeText,
}
