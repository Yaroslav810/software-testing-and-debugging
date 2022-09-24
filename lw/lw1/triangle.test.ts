import {readFileSync} from 'fs'
import {EOL} from 'os'
import path from 'path'
import {determineTypeOfTriangle, getInputData, InputData, TYPES} from './triangle'

const TESTS_PATH = '/tests/tests.txt'
const TESTS_ENCODING = 'utf8'
const SPACE = ' '
const SEPARATOR = ':'

function convertToInputData(params: string[], result: string): (InputData | 'unknown_error') {
    const data = getInputData(params)
    if (data === 'unknown_error' || !TYPES.includes(result)) {
        return 'unknown_error'
    }

    return data
}

const fileContent = readFileSync(path.join(__dirname, TESTS_PATH), TESTS_ENCODING)
const tests = fileContent.split(EOL).filter(line => line)

describe(`Testing from a test file`, () => {
    tests.forEach(test => {
        const [_inputData, _result] = test.split(SEPARATOR)
        const inputData = _inputData.split(SPACE)
        const result = _result.trim()
        const data = convertToInputData(inputData, result)
        const [a, b, c] = inputData
        it(`${a}, ${b}, ${c}. Рузультат: ${result}`, () => {
            expect(determineTypeOfTriangle(data)).toBe(result)
        })
    })
})
