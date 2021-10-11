import { fetch } from './csrf'

const ADD_LISTS = 'dashboard/addLists'

const addLists = lists => ({
	type: ADD_LISTS,
	lists,
})

export const getLists = (seed_tracks, seed_artists) => async dispatch => {
	const lists = {}
	const resFeat = await fetch('/api/music/featured')
	if (resFeat.status === 200) lists.featured = resFeat.data
	const resNew = await fetch('/api/music/new-releases')
	if (resNew.status === 200) lists.newReleases = resNew.data
	if (seed_tracks || seed_artists) {
		const url = '/api/music/recommendations?'
		url += seed_tracks ? `seed_tracks=${seed_tracks}` : ''
		url += seed_artists ? `&seed_artists=${seed_artists}` : ''
		const resRec = await fetch(url)
		if (resRec.status === 200) lists.recommended = resRec.data

	}

	dispatch(addLists({ ...lists }))
}

const initialState = {
	featured: {},
	newReleases: {},
	recommended: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_LISTS:
			return {
				...state,
				...action.lists,
			}

		default:
			return state
	}
}
