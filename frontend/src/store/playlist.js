import { fetch } from './csrf.js'

const ADD_PLAYLIST = 'artists/addPlaylist'

const addPlaylist = playlist => ({
	type: ADD_PLAYLIST,
	playlist,
})

export const getPlaylist = id => async dispatch => {
	const res = await fetch(`/api/music/playlist/${id}`)
	if (res.ok) dispatch(addPlaylist(res.data.playlist))
}
const initialState = {}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PLAYLIST:
			return {
				...state,
				...action.playlist,
			}
		default:
			return state
	}
}
