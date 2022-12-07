import {schemes} from "./schemes";
import Ajv from "ajv";

const ajv = new Ajv()

function validateProducts(data: Object) {
    const validate = ajv.compile(schemes.products)
    return validate(data)
}

function validateAddProduct(data: Object) {
    const validate = ajv.compile(schemes.addProduct)
    return validate(data)
}

function validateEditProduct(data: Object) {
    const validate = ajv.compile(schemes.editProduct)
    return validate(data)
}

function validateDeleteProduct(data: Object) {
    const validate = ajv.compile(schemes.deleteProduct)
    return validate(data)
}

function validateInvalidAddProduct(data: Object) {
    const validate = ajv.compile(schemes.invalidAddProduct)
    return validate(data)
}

const validators = {
    validateProducts,
    validateAddProduct,
    validateEditProduct,
    validateDeleteProduct,
    validateInvalidAddProduct,
}

export {
    validators,
}
