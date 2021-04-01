import { fetch } from './csrf.js'

const ADD_ALBUMS = 'album/addAlbums'

const addAlbums = albums => ({
	type: ADD_ALBUMS,
	albums,
})

export const getAlbums = ids => async dispatch => {
	const res = await fetch(`/api/music/albums?albumIds=${ids}`)
	if (res.ok) {
		// console.log(res.data.albums)
		dispatch(addAlbums(res.data.albums))
	}
}
const initialState = {
	// test: {
	// 	title: 'Fragile',
	// 	image: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Fragile_%28Yes_album%29_cover_art.jpg',
	// 	artist: {
	// 		image: 'https://i.scdn.co/image/89b92c6b59131776c0cd8e5df46301ffcf36ed69',
	// 		name: 'Fragile',
	// 	},
	// 	year: 1973,
	// 	songs: {
	// 		count: 10,
	// 		playtime: '42 min 30 sec',
	// 		tracks: [
	// 			{
	// 				id: '53A0W3U0s8diEn9RhXQhVz',
	// 				number: 1,
	// 				artists: ['Keane'],
	// 				name: "Everybody's changing",
	// 			},
	// 		],
	// 	},
	// },
}
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
