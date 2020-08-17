export default (state=null, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            case 'CURRENT_USER':
                return action.user
        case 'LOGOUT_USER':
            return null
        default:
        return state
    }
}
