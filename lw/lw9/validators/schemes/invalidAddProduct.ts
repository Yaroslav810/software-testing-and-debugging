const invalidAddProduct = {
    type: "object",
    required: [
        "status",
    ],
    properties: {
        status: {
            type: "integer",
            enum: [
                0,
                1
            ]
        },
    },
}

export {
    invalidAddProduct,
}
