import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import './AlbumDetailPage.css'

import AlbumTracks from '../Tracks/AlbumTracks'
import { getAlbums } from '../../store/albums'

const getColors = require('get-image-colors')

export default function AlbumDetailPage() {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [colorState, setColorState] = useState('#000000')
	const [isLoaded, setIsLoaded] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const { [id]: album } = useSelector(state => state.albums)

	function setBackgroundColor(image) {
		getColors(image)
			.then(colorArray => {
				const firstColor = colorArray[0]._rgb
				setColorState(`rgba(${firstColor[0]},${firstColor[1]},${firstColor[2]},${firstColor[3]})`)
			})
			.catch(e => {
				console.log(e)
			})
	}

	useEffect(() => {
		if (album) setBackgroundColor(album.image)
	}, [album])

	useEffect(() => {
		if (!album) dispatch(getAlbums(id))
		else {
			setIsLoaded(true) //! LOADS NOTHING IF NO ALBUM IS LOADED
		}
	}, [id, dispatch, album])

	function convertTime(ms) {
		const minutes = ms / 1000 / 60
		const seconds = (minutes % 1).toFixed(4) * 60
		return `${Math.floor(minutes)} min, ${Math.floor(seconds)} sec`
	}

	return (
		<div className="page">
			<div style={{ background: `linear-gradient(${colorState},#0f0f0f 550px)` }} className="album">
				{isLoaded && (
					<div className="album-details">
						<img className="album-image" src={album?.image} alt="album-cover" />
						<div className="album-text">
							<p>ALBUM</p>
							<h1>{album?.name}</h1>
							<div className="album-stats">
								<div className="album-artist">
									<img className="album-artist-image" src={album?.artists[0]?.image} alt="artist-avatar" />
									<a className="album-artist-name" href={`/artist/${album?.artists[0]?.id}`}>
										{album?.artists[0]?.name}
									</a>
								</div>
								<p className="album-year">{album?.release_date}</p>
								<p className="album-songs">{`${album?.songs.total} songs, ${convertTime(album?.songs.playtime)}`}</p>
							</div>
						</div>
					</div>
				)}
				<AlbumTracks isLiked={isLiked} setIsLiked={setIsLiked} style={{ height: '100%' }} />
			</div>
		</div>
	)
}
