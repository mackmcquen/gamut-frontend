export default (state=[], action) => {
    switch(action.type) {
        case 'FETCH_ARTWORKS':
            return action.artworks
        case 'POST_ARTWORK':
            return [...state, action.artwork]
        case 'DELETE_ARTWORK':
            return state.filter(({ id }) => id !== action.artwork);
        default:
        return state
    }
}
