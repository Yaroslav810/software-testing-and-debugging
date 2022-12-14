function getProductUrl() {
    return '/product/casio-ga-1000-1aer-3'
}

function getUserData() {
    return {
        login: {
            busy: 'Yaroslav',
            free: 'Yarik10',
        },
        password: 'Qwerty1',
        name: 'Ярослав',
        email: 'yarik10@mail.ru',
        address: 'MKS',
        note: 'Доставить надо через Роскосмос, SpaceX в прошлый раз потеряли',
    }
}

function getPlaceOrderButtonText() {
    return 'Оформить заказ'
}

function getErrorLoginMessageText() {
    return 'Этот логин уже занят'
}

function getMessageText() {
    return 'Спасибо за Ваш заказ. В ближайшее время с Вами свяжется менеджер для согласования заказа'
}

const data = {
    productUrl: getProductUrl(),
    user: getUserData(),
    placeOrderButtonText: getPlaceOrderButtonText(),
    errorLoginMessageText: getErrorLoginMessageText(),
    messageText: getMessageText(),
}

export {
    data,
}
