import axios from 'axios'
import {path} from "./config";

const getPathAllProducts = () => `${path}/api/products`
const getPathDeleteProduct = () => `${path}/api/deleteproduct`
const getPathAddProduct = () => `${path}/api/addproduct`
const getPathEditProduct = () => `${path}/api/editproduct`

const paths = {
    getPathAllProducts,
    getPathDeleteProduct,
    getPathAddProduct,
    getPathEditProduct,
}

type Options = {
    method: 'GET',
    url: string,
    params?: any,
} | {
    method: 'POST',
    url: string,
    body: Object,
}

function request(options: Options) {
    if (options.method === 'GET') {
        return getRequest(options.url, options.params)
    }
    if (options.method === 'POST') {
        return postRequest(options.url, options.body)
    }
}

async function getRequest(url: string, params?: any) {
    return await axios.get(url, {
        params,
    })
}

async function postRequest(url: string, body: Object) {
    return await axios.post(url, body)
}

export {
    paths,
    request,
}
