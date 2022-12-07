import {paths, request} from "./request";
import {AxiosResponse} from "axios";

function getData(response: AxiosResponse<any, any>) {
    return response.data
}

async function getProducts() {
    return getData(await request({
        method: 'GET',
        url: paths.getPathAllProducts(),
    }))
}

async function deleteProduct(id: string) {
    return getData(await request({
        method: 'GET',
        url: paths.getPathDeleteProduct(),
        params: {
            id,
        }
    }))
}

async function addProduct(body: Object) {
    return getData(await request({
        method: 'POST',
        url: paths.getPathAddProduct(),
        body,
    }))
}

async function editProduct(body: Object) {
    return getData(await request({
        method: 'POST',
        url: paths.getPathEditProduct(),
        body,
    }))
}

const actions = {
    getProducts,
    deleteProduct,
    addProduct,
    editProduct,
}

export {
    actions,
}
