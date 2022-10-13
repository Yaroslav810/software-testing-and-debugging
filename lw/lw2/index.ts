import {hasItemInSet, Links, makeRequest, writeToFile} from './utils'
import {JSDOM} from 'JSDOM'

const SITE = 'http://links.qatl.ru/'

const OUTPUT_DIR = 'result'
const VALID_PATH = `/${OUTPUT_DIR}/valid.txt`
const INVALID_PATH = `/${OUTPUT_DIR}/invalid.txt`

function isOriginSame(origin: string) {
    return SITE === `${origin}/`
}

function isBlankPage(protocol: string) {
    return protocol === 'about:'
}

async function parseHTML(url: string, body: string, linksStorage: Links) {
    const {document} = new JSDOM(body).window
    const _links = document.getElementsByTagName('a')
    const links = Array.prototype.slice.call(_links)
    for (const link of links) {
        const newUrl = new URL(link.href, url)
        if (isOriginSame(newUrl.origin) && !isBlankPage(newUrl.protocol)) {
            await countBrokenLinks(newUrl.href, linksStorage)
        }
    }
}

async function countBrokenLinks(url: string, links: Links) {
    if (hasItemInSet(links.invalid, url) || hasItemInSet(links.valid, url)) {
        return
    }
    const response = await makeRequest(url)
    if (!response) {
        return
    }
    if (response.status >= 400) {
        links.invalid.add({
            link: url,
            status: response.status,
        })
    }
    if (response.status < 400) {
        links.valid.add({
            link: url,
            status: response.status,
        })
        await parseHTML(url, response.body, links)
    }
}

async function run() {
    const links: Links = {
        valid: new Set(),
        invalid: new Set(),
    }
    await countBrokenLinks(SITE, links)

    writeToFile(VALID_PATH, links.valid)
    writeToFile(INVALID_PATH, links.invalid)
}

run()
