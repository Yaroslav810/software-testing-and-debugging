function getProductForAdd() {
    return {
        category_id: "2",
        title: "Title",
        content: "Content",
        price: "5000",
        old_price: "4500",
        status: "1",
        keywords: "Keywords",
        description: "Description",
        hit: "1"
    }
}

function getProductForEdit(id: string) {
    return {
        id,
        category_id: "2",
        title: "Title #2",
        content: "Content #2",
        price: "4000",
        old_price: "3500",
        status: "1",
        keywords: "Keywords #2",
        description: "Description #2",
        hit: "1"
    }
}

function getInvalidProductForAdd() {
    return {
        category_id: "16",
        title: "Title #3",
        content: "Content #3",
        price: "5000",
        old_price: "4500",
        status: "2",
        keywords: "Keywords #3",
        description: "Description #3",
        hit: "2"
    }
}

function getInvalidProductForEdit(id: string) {
    return {
        id,
        category_id: "16",
        title: "Title #4",
        content: "Content #4",
        price: "5000",
        old_price: "4500",
        status: "2",
        keywords: "Keywords #4",
        description: "Description #4",
        hit: "2"
    }
}

function getInvalidCategoryIdProductForAdd() {
    return {
        category_id: "16",
        title: "Title",
        content: "Content",
        price: "5000",
        old_price: "4500",
        status: "1",
        keywords: "Keywords",
        description: "Description",
        hit: "1"
    }
}

function getInvalidHitProductForAdd() {
    return {
        category_id: "2",
        title: "Title",
        content: "Content",
        price: "5000",
        old_price: "4500",
        status: "1",
        keywords: "Keywords",
        description: "Description",
        hit: "2"
    }
}

function getInvalidCategoryIdProductForEdit(id: string) {
    return {
        id,
        category_id: "16",
        title: "Title #2",
        content: "Content #2",
        price: "4000",
        old_price: "3500",
        status: "1",
        keywords: "Keywords #2",
        description: "Description #2",
        hit: "1"
    }
}

function getInvalidHitProductForEdit(id: string) {
    return {
        id,
        category_id: "2",
        title: "Title #2",
        content: "Content #2",
        price: "4000",
        old_price: "3500",
        status: "1",
        keywords: "Keywords #2",
        description: "Description #2",
        hit: "2"
    }
}

export {
    getProductForAdd,
    getProductForEdit,
    getInvalidProductForAdd,
    getInvalidProductForEdit,
    getInvalidCategoryIdProductForAdd,
    getInvalidHitProductForAdd,
    getInvalidCategoryIdProductForEdit,
    getInvalidHitProductForEdit,
}
