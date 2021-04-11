import { fetch } from './csrf.js'

const ADD_ALBUMS = 'album/addAlbums'

const addAlbums = albums => ({
	type: ADD_ALBUMS,
	albums,
})

export const getAlbums = ids => async dispatch => {
	const res = await fetch(`/api/music/albums?albumIds=${ids}`)
	if (res.ok) dispatch(addAlbums(res.data.albums))
}
const initialState = {}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ALBUMS:
			return {
				...state,
				...action.albums,
			}
		default:
			return state
	}
}
