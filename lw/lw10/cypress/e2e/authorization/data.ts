function getUserData() {
    return {
        login: 'Yaroslav',
        password: 'Qwerty1',
    }
}

function getAuthorizationUrl() {
    return '/user/login'
}

function getMessageText() {
    return 'Вы успешно авторизованы'
}

const data = {
    user: getUserData(),
    authorizationUrl: getAuthorizationUrl(),
    messageText: getMessageText(),
}

export {
    data,
}
