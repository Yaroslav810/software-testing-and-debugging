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

function strip(n: number): number {
    return parseFloat(n.toPrecision(PRECISION))
}

function sum(a: number, b: number): number {
    return strip(a + b)
}

function getInputData(): InputData {
    const [, , a, b, c] = process.argv
    return {
        a: Number(a) || 0,
        b: Number(b) || 0,
        c: Number(c) || 0,
    }
}

function determineTypeOfTriangle(data: InputData): TriangleType {
    const dataAsc = Object.values(data).sort((a, b) => b - a)
    const [_a, _b, _c] = dataAsc
    const [a, b, c] = [strip(_a), strip(_b), strip(_c)]

    if (a >= sum(b, c)) {
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
            return "Ошибка типа"
        default:
            throw new Error()
    }
}

export {
    InputData,
    TriangleType,

    getInputData,
    determineTypeOfTriangle,
    getTriangleTypeText,
}
