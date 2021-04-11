import { fetch } from './csrf.js'

const ADD_ARTISTS = 'artists/addArtists'

const addArtists = artists => ({
	type: ADD_ARTISTS,
	artists,
})

export const getArtist = ids => async dispatch => {
	const res = await fetch(`/api/music/artist?artistIds=${ids}`)
	if (res.ok) dispatch(addArtists(res.data.artists))
}
const initialState = {}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ARTISTS:
			return {
				...state,
				...action.artists,
			}
		default:
			return state
	}
}
