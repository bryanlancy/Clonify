import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import TrackRow from '../../Tracks/TrackRow'
import { updateSongLink } from '../../../store/songbar'
import { getAlbums } from '../../../store/albums'
import { checkText, getColors, updatePlayer, defaultAvatar } from '../../../utils'

import './AlbumDetailPage.css'

export default function AlbumDetailPage() {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [colorState, setColorState] = useState('#000000')
	const [isLoaded, setIsLoaded] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const { [id]: album } = useSelector(state => state.albums)

	async function setBackgroundColor(image) {
		setColorState((await getColors(image))[0])
	}

	useEffect(() => {
		if (album) setBackgroundColor(album.image)
	}, [album])

	useEffect(() => {
		if (!album) dispatch(getAlbums(id))
		else setIsLoaded(true) //! LOADS NOTHING IF NO ALBUM IS LOADED
	}, [id, dispatch, album])

	function convertTime(ms) {
		const minutes = ms / 1000 / 60
		const seconds = (minutes % 1).toFixed(4) * 60
		return `${Math.floor(minutes)} min, ${Math.floor(seconds)} sec`
	}

	function changeLike() {
		setIsLiked(!isLiked)
	}

	return (
		<div className="page album-page">
			<div className="album" style={{ background: `linear-gradient(${colorState},#0f0f0f 550px)` }}>
				{isLoaded && (
					<>
						<div className="album-details">
							<img className="album-image" src={album?.image} alt="album-cover" />
							<div className="album-text">
								<p>ALBUM</p>
								<h1>{checkText(album?.name, 30)}</h1>
								<div className="album-stats">
									<div className="album-artist">
										<img className="album-artist-image" src={album?.artists[0]?.image || defaultAvatar} alt="artist-avatar" />
										<a className="album-artist-name" href={`/artist/${album?.artists[0]?.id}`}>
											{album?.artists[0]?.name}
										</a>
									</div>
									<p className="album-year">{album?.release_date}</p>
									<p className="album-songs">{`${album?.songs.total} songs, ${convertTime(album?.songs.playtime)}`}</p>
								</div>
							</div>
						</div>
						<div className="album-tracks">
							<div className="buttons">
								<div className="play-button" onClick={e => updatePlayer(dispatch, e, 'album', id)}>
									<i className="fas fa-play"></i>
								</div>
								<i className={`${isLiked ? 'fas' : 'fal'} fa-heart heart-tracks`} onClick={changeLike} style={{ color: isLiked ? '#1db954' : '' }}></i>
								<i className="far fa-ellipsis-h dropdown-button"></i>
							</div>

							<>
								{album?.songs.tracks.map(track => (
									<TrackRow key={track.id} id={track.id} rowInfo={{ name: track.name, artists: track.artists, explicit: track.explicit, duration: track.duration, number: track.track_number }} />
								))}
							</>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
