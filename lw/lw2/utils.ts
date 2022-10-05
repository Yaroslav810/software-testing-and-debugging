import axios from 'axios'
import fs from 'fs'
import {EOL} from 'os'

type Response = {
    status: number,
    body: string,
}

type Link = {
    link: string,
    status: number,
}

type Links = {
    valid: Set<Link>,
    invalid: Set<Link>,
}

async function makeRequest(url: string): Promise<Response> {
    try {
        const data = await axios.get(url)
        return {
            status: data.status,
            body: data.data,
        }
    }
    catch (error) {
        return {
            status: error.response.status,
            body: '',
        }
    }
}

function hasItemInSet(set: Set<Link>, link: string) {
    return Array.from(set).some(item => item.link === link)
}

async function writeToFile(path: string, set: Set<Link>) {
    let result = ''
    set.forEach(item => {
        result += item.link + ' ' + item.status + EOL
    })
    result += 'Quantity: ' + set.size + EOL
    result += 'Date: ' + new Date() + EOL
    fs.writeFile(__dirname + path, result, () => {
        console.log(path + ' is saved')
    })
}

export {
    makeRequest,
    hasItemInSet,
    writeToFile,
    Link,
    Links,
}
