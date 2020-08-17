export const fetchArtworks = (artworks) => {
    return  { type: 'FETCH_ARTWORKS', artworks }
}

export const newArtwork = (artwork) => {
    return { type: 'POST_ARTWORK', artwork }
}

export const deleteArtwork = (artwork) => {
    return { type: 'DELETE_ARTWORK', artwork }
}
