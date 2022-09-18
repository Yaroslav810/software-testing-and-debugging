import {determineTypeOfTriangle, getInputData, getTriangleTypeText} from "./triangle";

function printTextInConsole(text: string) {
    console.log(text)
}

const data = getInputData()
const type = determineTypeOfTriangle(data)
const text = getTriangleTypeText(type)

printTextInConsole(text)
