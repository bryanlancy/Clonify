const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const axios = require('axios')
const defaultAvatar =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX29/fW1tbz9PTX19ft7u7w8fHc3Nzn6Ojk5OT19vbd3d3q6+vh4eHT09Pj4+Pv7+8nGkdkAAAENklEQVR4nO2d7ZKrIAyGFaqgiL3/u111t1vrVkugm5jO+8zs+dcZ3kPIF6GtKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwL/RGWM66UX8EyaMva3rOk5/th+DkV7Qe2m8jbO0OzHasZFe1tsI9lHdr0obpJf2Fvb0fYpG0+7rWzS2ym3VHetbNDrpRZbQvxY4SRykl5lNZxP0zbRKQ6RJ1DdhVUrs0gVOKJSYbKJqd7ElCZzOovSCqQxEgXUcpZdMI6SEiY3Ei/SiKdC8zA3pVVMg2+iCIju90m10JuqpGal+9Iaa9C1zC2s9cT/vFM5oKTOyt7C20ktPIyMW3lDia/KNVIuZ0lLuR3rpxadg8o1UyUEsOIZKDqIvEKgj/S5xNHXU0D/tSxSqcKa5Sek3Xnr5CZQp1FBBQaF+hWWeRsM5LIoWKnxpWcTXEA/LsjYNt4lNiUIdfYwSgSpqiyJnqiFYVJXLF6iitCgrgaXXnkh+VqOlJZwdL1TEioXcXpSeW9KEKZqnW6jDzyzkbaKeLayqS84mquiz/ZJRYEQNhdMKup1qstEZev6tIudeQwyKekLhHZJEFZXvHwgSdQokSNQqsKquiQoV5TJbuhdT3ssGWlWRvmouzvuVX/SvJK4DfeO9C82Jw0bj27g8HIn9fZXmcNZ7PapvhuWzMVp/ztDhHt5VrDq7za6pxnZ1AtfNj2jP1xn29ebVT7s6XWZ88qok1sNqq7bvMmJ9Lv96fabgYRuurl8ssP75t320xCcV5cP/kTTPK94/SzRNCM65EK4bZ7LzsOY8YXLXXyY+h9n//EkKqoOAkPJy6/Dl1yk6xMe52eQVj+KbcQf60q3gX3ldCMZ+byPD63dRJ6iqUor5GHu3XWnj+piSmYs/NUluyMS6HXwIl8slBD+0dXJpJdwHJzYr4je0z8jaadngRRqiLaqiG+1URAN/ybBsOoIXwyxbKHqfwXEKZ8ROYtnUBQExdzoyCZQbYGATKHW/n/+8iYyQrykaYCMiY6ZcnnRGJCR2fEYqdD+cdZOdrVAic+M8hjKzw2XTzlQk0hpWgRIRseiJGh0BV8PqaERifsEUaRb8bcWyRwd0+BtSnBnNDL8z5Wlg3OHP23gdzeRquAUyB4tJIXfvm7E4/FHI3clgDocCAZGpkbhSyF1dcAd8/pDPWzvNcNdPn6+Qr1d6g7sZxZ2W8iemUAiFUPgXbk/z+dHi83Oaz8+8WW8tFoXss1Gf38XgdjX8FxdsYwrfSAwr8LYTJW5meO8PrwIKWa/XZL5PkfC9+cUIjdGydaPkBtsyv1mALFBwnJ1Fouy8PoNDlf4uiS7ph1YK9PXSs/rTNh6/CSnTZ8/xgLYZtr/I9RZ10Y4icf45zfyrau8rN+z8y2zyr2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn5AvEEjipkcYsygAAAABJRU5ErkJggg=='
const defaultImage = 'https://img.pngio.com/my-my-png-album-covers-500_500.png'
const { setSpotifyToken } = require('../../utils/auth')

let headers = {}
router.use(setSpotifyToken)
router.use((req, res, next) => {
	headers = { Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}` }
	next()
})

//Get playlist by id
router.get(
	'/playlist/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params
		if (id) {
			const config = {
				method: 'get',
				url: `https://api.spotify.com/v1/playlists/${id}`,
				headers,
			}
			const response = await axios(config)

			if (response.status === 200) {
				const { id, external_urls, images, name, description, followers, owner, tracks } = response.data
				res.status(200).json({
					playlist: {
						[id]: {
							openUrl: external_urls['spotify'],
							image: images[0].url || defaultAvatar,
							name,
							description,
							likes: followers.total,
							owner: {
								id: owner.id,
								openUrl: owner.external_urls['spotify'],
								name: owner.display_name,
							},
							songs: {
								total: tracks.total,
								tracks: tracks.items.map(track => {
									const { id, name, artists, duration_ms, explicit, album } = track.track
									return {
										id,
										name,
										image: album.images[0].url || defaultImage,
										artists: artists.map(a => {
											return {
												id: a.id,
												name: a.name,
											}
										}),
										duration: duration_ms,

										explicit: explicit,
									}
								}),
							},
						},
					},
				})
			} else res.status(500).json({ message: 'Ooopsy Poopsy' })
		} else res.status(400).json({ message: "Missing 'id'." })
	})
)

//Get artists by id
router.get(
	'/artist',
	asyncHandler(async (req, res) => {
		const { artistIds } = req.query

		const config = {
			method: 'get',
			headers,
		}

		const getArtistDetails = async (type, id) => {} // <-- refactor repeated code into one

		//Track Row
		const getTopTracks = async id => {
			config.url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
			const response = await axios(config)
			if (response.status === 200) {
				let { tracks } = response.data
				tracks = Object.assign(
					...tracks.map(track => {
						const { id, name, artists, album, duration_ms, explicit, external_urls } = track
						return {
							[id]: {
								openUrl: external_urls['spotify'],
								name,
								image: album.images[0] ? album.images[0].url : defaultImage,
								duration: duration_ms,
								explicit,
								artists: artists.map(artist => {
									const { id, name } = artist
									return {
										id,
										name,
									}
								}),
							},
						}
					})
				)
				return tracks
			}
		}

		//Cards
		const getRelatedArtists = async id => {
			config.url = `https://api.spotify.com/v1/artists/${id}/related-artists`
			const response = await axios(config)
			if (response.status === 200) {
				let { artists } = response.data
				artists = Object.assign(
					...artists.map(artist => {
						const { id: artistId, name, external_urls, images } = artist
						return {
							[artistId]: {
								name,
								openUrl: external_urls['spotify'],
								image: images[0] ? images[0].url : defaultImage,
							},
						}
					})
				)
				return artists
			}
		}

		//Cards
		const getArtistAlbums = async id => {
			config.url = `https://api.spotify.com/v1/artists/${id}/albums`
			const response = await axios(config)
			if (response.status === 200) {
				let { items } = response.data
				items = Object.assign(
					...items.map(album => {
						const { id: albumId, name, external_urls, artists, images } = album
						return {
							[albumId]: {
								name,
								openUrl: external_urls['spotify'],
								image: images[0] ? images[0].url : defaultImage,
								artists: artists.map(a => a.name),
							},
						}
					})
				)

				return items
			}
		}

		if (artistIds) {
			config.url = `https://api.spotify.com/v1/artists?ids=${artistIds}`
			const response = await axios(config)

			if (response.status === 200) {
				let { artists } = response.data
				artists = await Object.assign(
					...artists.map(async artist => {
						const { id, external_urls, followers, images, name, genres, popularity } = artist
						const topTracks = await getTopTracks(id)
						const relatedArtists = await getRelatedArtists(id)
						const albums = await getArtistAlbums(id)

						return {
							[id]: {
								openUrl: external_urls['spotify'],
								image: images[0].url || defaultAvatar,
								name,
								genres,
								popularity,
								followers: followers.total,
								topTracks,
								relatedArtists,
								albums,
							},
						}
					})
				)
				res.status(200).json({ artists })
			} else res.status(500).json({ message: 'Ooopsy Poopsy' })
		} else res.json({ message: 'Please provide an artist id.' }, 400)
	})
)

//Get albums by id
router.get(
	'/albums',
	asyncHandler(async (req, res) => {
		const { albumIds } = req.query
		if (albumIds) {
			const config = {
				method: 'get',
				url: `https://api.spotify.com/v1/albums?ids=${albumIds}`,
				headers,
			}

			const response = await axios(config)
			if (response.status === 200) {
				const filtered = {}
				const { albums } = response.data
				albums.forEach(album => {
					const { id, external_urls, images, name, genres, label, release_date, copyrights, artists } = album
					let totalDuration = 0
					filtered[id] = {
						openUrl: external_urls['spotify'],
						image: images[0].url || defaultImage,
						name,
						genres,
						label: label,
						release_date: release_date.split('-')[0],
						copyrights: copyrights.map(c => c.text),
						artists: artists.map(a => {
							return {
								id: a.id,
								name: a.name,
							}
						}),
						songs: {
							total: album.total_tracks,
							tracks: album.tracks.items.map(track => {
								totalDuration += track.duration_ms
								return {
									id: track.id,
									name: track.name,
									artists: track.artists.map(a => {
										return {
											id: a.id,
											name: a.name,
										}
									}),
									duration: track.duration_ms,
									track_number: track.track_number,
									explicit: track.explicit,
								}
							}),
						},
					}
					filtered[album.id].songs.playtime = totalDuration
				})

				res.json({ albums: filtered })
			} else res.json('Ooopsy Poopsy')
		} else {
			res.status(400).json({ message: 'Please provide an album id.' })
		}
	})
)

//Search by type and query
router.get(
	'/search',
	asyncHandler(async (req, res) => {
		const types = ['album', 'artist', 'playlist', 'track']
		let { q, type, limit, offset } = req.query
		if (q && types.includes(type)) {
			const config = {
				method: 'get',
				url: `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}&offset=${offset}`,
				headers,
			}
			const response = await axios(config)

			if (response.status === 200) {
				if (response.data[`${type}s`].items.length) {
					switch (type) {
						case 'album':
							const { albums } = response.data
							res.status(200).json({
								total: albums.total,
								album: Object.assign(
									...albums.items.map(album => {
										return {
											[album.id]: {
												openUrl: album.external_urls['spotify'],
												name: album.name,
												image: album.images[0] ? album.images[0].url : defaultImage,
												artists: album.artists.map(artist => artist.name),
												songs: {
													total: album.total_tracks,
												},
											},
										}
									})
								),
							})
							break
						case 'artist':
							const { artists } = response.data
							res.status(200).json({
								total: artists.total,
								artist: Object.assign(
									...artists.items.map(artist => {
										return {
											[artist.id]: {
												openUrl: artist.external_urls['spotify'],
												image: artist.images[0] ? artist.images[0].url : defaultImage,
												name: artist.name,
												genres: artist.genres,
												followers: artist.followers.total,
												popularity: artist.popularity,
											},
										}
									})
								),
							})
							break
						case 'playlist':
							const { playlists } = response.data
							res.status(200).json({
								total: playlists.total,
								playlist: Object.assign(
									...playlists.items.map(playlist => {
										return {
											[playlist.id]: {
												openUrl: playlist.external_urls['spotify'],
												image: playlist.images[0] ? playlist.images[0].url : defaultImage,
												name: playlist.name,
												description: playlist.description,
												songs: {
													total: playlist.tracks.total,
												},
											},
										}
									})
								),
							})
							break
						case 'track':
							const { tracks } = response.data
							res.status(200).json({
								total: tracks.total,
								track: Object.assign(
									...tracks.items.map(track => {
										return {
											[track.id]: {
												openUrl: track.external_urls['spotify'],
												image: track.album.images[0] ? track.album.images[0].url : defaultImage,
												name: track.name,
												duration: track.duration_ms,
												explicit: track.explicit,
												popularity: track.popularity,
												artists: track.artists.map(artist => {
													return {
														id: artist.id,
														name: artist.name,
													}
												}),
												album: {
													id: track.album.id,
													name: track.album.name,
												},
											},
										}
									})
								),
							})
							break
						default:
							break
					}
				} else {
					res.status(204).json('No results found')
				}
			}
		} else res.status(404).json('Ooopsy Poopsy')
	})
)

//Get featured
router.get(
	'/featured',
	asyncHandler(async (req, res) => {
		const config = {
			method: 'get',
			url: `https://api.spotify.com/v1/browse/featured-playlists?country=US`,
			headers,
		}
		const response = await axios(config)
		if (response.status === 200) {
			const { message, playlists, total } = response.data
			res.json({
				total,
				message,
				playlists: Object.assign(
					...playlists.items.map(playlist => {
						const { id, images, name, external_urls, description } = playlist
						return {
							[id]: {
								openUrl: external_urls['spotify'],
								name,
								image: images[0] ? images[0].url : defaultImage,
								description,
							},
						}
					})
				),
			})
		}
	})
)

//Get new releases
router.get(
	'/new-releases',
	asyncHandler(async (req, res) => {
		const config = {
			method: 'get',
			url: `https://api.spotify.com/v1/browse/new-releases?country=US`,
			headers,
		}
		const response = await axios(config)
		if (response.status === 200) {
			const { albums, total } = response.data
			res.json({
				total,
				albums: Object.assign(
					...albums.items.map(album => {
						const { id, images, name, artists, external_urls } = album
						return {
							[id]: {
								openUrl: external_urls['spotify'],
								name,
								image: images[0] ? images[0].url : defaultImage,
								artists: artists.map(a => a.name),
							},
						}
					})
				),
			})
		}
	})
)

//Get recommendations
router.get(
	'/recommendations',
	asyncHandler(async (req, res) => {
		const { seed_artists, seed_genres, seed_tracks } = req.query

		if (seed_artists || seed_genres || seed_tracks) {
			const config = {
				method: 'get',
				url: `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists ? seed_artists : ''}&seed_genres=${seed_genres ? seed_genres : ''}&seed_tracks=${seed_tracks ? seed_tracks : ''}`,
				headers,
			}
			const response = await axios(config)
			if (response.status === 200) {
				const { tracks } = response.data
				res.json({
					tracks: Object.assign(
						...tracks.map(track => {
							const { id, name, album, artists, external_urls } = track
							return {
								[id]: {
									openUrl: external_urls['spotify'],
									name,
									image: album.images[0] ? album.images[0].url : defaultImage,
									artists: artists.map(a => a.name),
								},
							}
						})
					),
				})
			} else res.status(500).json({ message: 'Ooopsy Poopsy' })
		} else res.status(400).json({ message: 'Please provide a seed value.' })
	})
)

module.exports = router
