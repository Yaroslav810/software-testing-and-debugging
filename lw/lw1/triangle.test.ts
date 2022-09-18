import {readFileSync} from 'fs'
import {EOL} from 'os'
import path from 'path'
import {determineTypeOfTriangle, InputData} from './triangle'

const TESTS_PATH = '/tests/tests.txt'
const TESTS_ENCODING = 'utf8'
const SPACE = ' '

function convertToInputData(a: string, b: string, c: string): InputData {
    return {
        a: Number(a),
        b: Number(b),
        c: Number(c)
    }
}

const fileContent = readFileSync(path.join(__dirname, TESTS_PATH), TESTS_ENCODING)
const tests = fileContent.split(EOL).filter(line => line)

describe('Testing from a test file', () => {
    tests.forEach(test => {
        const [a, b, c, result] = test.split(SPACE)
        it(`Стороны: ${a}, ${b}, ${c}. Рузультат: ${result}`, () => {
            expect(determineTypeOfTriangle(convertToInputData(a, b, c))).toBe(result)
        })
    })
})
