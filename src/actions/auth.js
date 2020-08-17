export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        user: user
    }
}

export const logoutUser = (user) => {
    return {
        type: 'LOGOUT_USER'
    }
}

export const currentUser = (user) => {
    return {
        type: 'CURRENT_USER',
        user: user
    }
}
