import {actions} from "../api/actions";
import {validators} from "../validators/validator";
import {
    getInvalidCategoryIdProductForAdd,
    getInvalidCategoryIdProductForEdit,
    getInvalidHitProductForAdd,
    getInvalidHitProductForEdit,
    getInvalidProductForAdd,
    getInvalidProductForEdit,
    getProductForAdd,
    getProductForEdit
} from "./testData";
import {path} from "../api/config";

describe(`Testing ${path}`, () => {
    jest.setTimeout(100000)

    const productsIds: string[] = []
    afterEach(() => {
        productsIds.forEach(async id => {
            await actions.deleteProduct(id);
        });
        productsIds.length = 0;
    });

    it('Получение всех товаров', async () => {
        const data = await actions.getProducts()
        expect(validators.validateProducts(data)).toBe(true)
    })

    it('Добавление товара', async () => {
        const addProduct = await actions.addProduct(getProductForAdd())
        const products = await actions.getProducts()
        const addProductId = addProduct.id.toString()
        const product = products.find(p => p.id === addProductId)
        productsIds.push(addProduct.id)
        const uncheckedFields = {
            alias: undefined,
            cat: undefined,
            img: undefined,
        }

        expect(validators.validateAddProduct(addProduct)).toBe(true)
        expect(addProduct.status).toBe(1)
        expect(product).toBeTruthy()
        expect({
            ...getProductForAdd(),
            ...uncheckedFields,
            id: addProductId,
        }).toEqual({
            ...product,
            ...uncheckedFields
        })
    })

    it('Редактирование товара', async () => {
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        const editProduct = await actions.editProduct(getProductForEdit(addProductId))
        const products = await actions.getProducts()
        const product = products.find(p => p.id === addProductId)
        productsIds.push(addProduct.id)
        const uncheckedFields = {
            alias: undefined,
            cat: undefined,
            img: undefined,
        }

        expect(validators.validateEditProduct(editProduct)).toBe(true)
        expect(editProduct.status).toBe(1)
        expect(product).toBeTruthy()
        expect({
            ...getProductForEdit(addProductId),
            ...uncheckedFields,
        }).toEqual({
            ...product,
            ...uncheckedFields
        })
    })

    it('Удаление товара', async () => {
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        const deleteProduct = await actions.deleteProduct(addProductId)
        const products = await actions.getProducts()
        const product = products.find(p => p.id === addProductId)

        expect(validators.validateDeleteProduct(deleteProduct)).toBe(true)
        expect(deleteProduct.status).toBe(1)
        expect(product).toBeUndefined()
    })

    it('Добавление товара с невалидными данными', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const invalidAddProduct = await actions.addProduct(getInvalidProductForAdd())
        const addProductId = invalidAddProduct.id

        expect(validators.validateInvalidAddProduct(invalidAddProduct)).toBe(true)
        expect(invalidAddProduct.status).toBe(0)
        expect(addProductId).toBeUndefined()
    })

    it('Добавление товара с невалидной category_id', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const invalidAddProduct = await actions.addProduct(getInvalidCategoryIdProductForAdd())
        const addProductId = invalidAddProduct.id

        expect(validators.validateInvalidAddProduct(invalidAddProduct)).toBe(true)
        expect(invalidAddProduct.status).toBe(0)
        expect(addProductId).toBeUndefined()
    })

    it('Добавление товара с невалидным hit', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const invalidAddProduct = await actions.addProduct(getInvalidHitProductForAdd())
        const addProductId = invalidAddProduct.id

        expect(validators.validateInvalidAddProduct(invalidAddProduct)).toBe(true)
        expect(invalidAddProduct.status).toBe(0)
        expect(addProductId).toBeUndefined()
    })

    it('Редактирование товара с невалидными данными', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        const editProduct = await actions.editProduct(getInvalidProductForEdit(addProductId))
        const products = await actions.getProducts()
        const product = products.find(p => p.id === addProductId)
        productsIds.push(addProduct.id)
        const uncheckedFields = {
            alias: undefined,
            cat: undefined,
            img: undefined,
        }

        expect(validators.validateEditProduct(editProduct)).toBe(true)
        expect(editProduct.status).toBe(0)
        expect(product).toBeTruthy()
        expect({
            ...getProductForAdd(),
            ...uncheckedFields,
            id: addProductId,
        }).toEqual({
            ...product,
            ...uncheckedFields
        })
    })

    it('Редактирование товара с невалидной category_id', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        const editProduct = await actions.editProduct(getInvalidCategoryIdProductForEdit(addProductId))
        const products = await actions.getProducts()
        const product = products.find(p => p.id === addProductId)
        productsIds.push(addProduct.id)
        const uncheckedFields = {
            alias: undefined,
            cat: undefined,
            img: undefined,
        }

        expect(validators.validateEditProduct(editProduct)).toBe(true)
        expect(editProduct.status).toBe(0)
        expect(product).toBeTruthy()
        expect({
            ...getProductForAdd(),
            ...uncheckedFields,
            id: addProductId,
        }).toEqual({
            ...product,
            ...uncheckedFields
        })
    })

    it('Редактирование товара с невалидным hit', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        const editProduct = await actions.editProduct(getInvalidHitProductForEdit(addProductId))
        const products = await actions.getProducts()
        const product = products.find(p => p.id === addProductId)
        productsIds.push(addProduct.id)
        const uncheckedFields = {
            alias: undefined,
            cat: undefined,
            img: undefined,
        }

        expect(validators.validateEditProduct(editProduct)).toBe(true)
        expect(editProduct.status).toBe(0)
        expect(product).toBeTruthy()
        expect({
            ...getProductForAdd(),
            ...uncheckedFields,
            id: addProductId,
        }).toEqual({
            ...product,
            ...uncheckedFields
        })
    })

    it('Редактирование несуществующего товара', async () => {
        // Тест проваливается, так как api возвращает успешный статус
        // Ожидается: 0, Получено: 1
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        await actions.deleteProduct(addProductId)
        const editProduct = await actions.editProduct(getProductForEdit(addProductId))

        expect(validators.validateEditProduct(editProduct)).toBe(true)
        expect(editProduct.status).toBe(0)
    })

    it('Удаление несуществующего товара', async () => {
        const addProduct = await actions.addProduct(getProductForAdd())
        const addProductId = addProduct.id.toString()
        await actions.deleteProduct(addProductId)
        const deleteProduct = await actions.deleteProduct(addProductId)

        expect(validators.validateDeleteProduct(deleteProduct)).toBe(true)
        expect(deleteProduct.status).toBe(0)
    })

    it('Генерация alias', async () => {
        const firstAddProduct = await actions.addProduct(getProductForAdd())
        const secondAddProduct = await actions.addProduct(getProductForAdd())
        const thirdAddProduct = await actions.addProduct(getProductForAdd())

        const firstAddProductId = firstAddProduct.id.toString()
        const secondAddProductId = secondAddProduct.id.toString()
        const thirdAddProductId = thirdAddProduct.id.toString()

        productsIds.push(firstAddProductId)
        productsIds.push(secondAddProductId)
        productsIds.push(thirdAddProductId)

        const products = await actions.getProducts()
        const firstProduct = products.find(p => p.id === firstAddProductId)
        const secondProduct = products.find(p => p.id === secondAddProductId)
        const thirdProduct = products.find(p => p.id === thirdAddProductId)

        const firstProductAlias = firstProduct.alias
        const secondProductAlias = secondProduct.alias
        const thirdProductAlias = thirdProduct.alias

        expect(secondProductAlias).toBe(`${firstProductAlias}-0`)
        expect(thirdProductAlias).toBe(`${secondProductAlias}-0`)
    })
})
