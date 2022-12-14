const product = {
    type: "object",
    required: [
        "id",
        "category_id",
        "title",
        "alias",
        "content",
        "price",
        "old_price",
        "status",
        "keywords",
        "description",
        "img",
        "hit",
        "cat"
    ],
    properties: {
        id: {
            type: "string",
            pattern: "^([1-9][0-9]*)$"
        },
        category_id: {
            type: "string",
            enum: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15"
            ]
        },
        title: {
            type: "string"
        },
        alias: {
            type: "string"
        },
        content: {
            type: ["string", "null"]
        },
        price: {
            type: "string",
            pattern: "^([1-9][0-9]*[.])?[0-9]+$"
        },
        old_price: {
            type: "string",
            pattern: "^([1-9][0-9]*[.])?[0-9]+$"
        },
        status: {
            type: "string",
            enum: [
                "0",
                "1"
            ]
        },
        keywords: {
            type: ["string", "null"]
        },
        description: {
            type: ["string", "null"]
        },
        img: {
            type: "string",
            pattern: "^(.*\\.(png|jpg))$"
        },
        hit: {
            type: "string",
            enum: [
                "0",
                "1",
                "2"
            ]
        },
        cat: {
            type: "string"
        }
    },
}

export {
    product,
}
