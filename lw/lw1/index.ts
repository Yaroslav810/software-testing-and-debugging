import {determineTypeOfTriangle, getInputData, getTriangleTypeText} from './triangle';

function printTextInConsole(text: string) {
    console.log(text)
}

const argv = process.argv
const data = getInputData(argv.slice(2))
const type = determineTypeOfTriangle(data)
const text = getTriangleTypeText(type)
printTextInConsole(text)
