const addProduct = {
    type: "object",
    required: [
        "status",
        "id"
    ],
    properties: {
        status: {
            type: "integer",
            enum: [
                0,
                1
            ]
        },
        id: {
            type: "integer"
        }
    },
}

export {
    addProduct,
}
