import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import TrackRow from '../../Tracks/TrackRow'
import { getPlaylist } from '../../../store/playlist'
import { addLike, removeLike } from '../../../store/likes'
import { checkText, getColors, updatePlayer } from '../../../utils'

import './PlaylistDetailPage.css'

export default function PlaylistDetailPage() {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.session)
	const { [id]: like } = useSelector(state => state.likes)
	const { [id]: playlist } = useSelector(state => state.playlist)
	const [isLiked, setIsLiked] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const [colorState, setColorState] = useState('#000000')

	useEffect(() => {
		if (!playlist) dispatch(getPlaylist(id))
		else setIsLoaded(true)
	}, [id, dispatch, playlist])

	useEffect(() => {
		if (playlist) setBackgroundColor(playlist.image)
	}, [playlist])

	useEffect(() => {
		setIsLiked(like ? true : false)
	}, [like])

	async function setBackgroundColor(image) {
		setColorState((await getColors(image))[0])
	}

	async function toggleLike() {
		if (isLiked) {
			setIsLiked(await dispatch(removeLike(user.id, id)))
		} else {
			setIsLiked(await dispatch(addLike(user.id, id, 'playlist')))
		}
	}

	const { image, name, description, owner, likes, songs } = playlist || {}
	return (
		<div className="page playlist-page">
			<div className="playlist" style={{ background: `linear-gradient(${colorState},#0f0f0f 550px)` }}>
				{isLoaded && playlist && (
					<>
						<div className="playlist-details">
							<img className="playlist-image" src={image} alt="playlist-cover" />
							<div className="playlist-text">
								<p>PLAYLIST</p>
								<h1>{checkText(name, 30)}</h1>
								<p>{description}</p>
								<div className="playlist-stats">
									<a className="album-artist-name" href={`/user/${owner.id}`}>
										{owner.name}
									</a>
									<p className="playlist-likes">{likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} likes</p>
									<p className="playlist-songs">{songs.total} songs</p>
								</div>
							</div>
						</div>
						<div className="playlist-tracks">
							<div className="buttons">
								<div className="play-button" onClick={e => updatePlayer(dispatch, e, 'playlist', id)}>
									<i className="fas fa-play"></i>
								</div>
								<i className={`${isLiked ? 'fas' : 'fal'} fa-heart heart-tracks`} onClick={toggleLike} style={{ color: isLiked ? '#1db954' : '' }}></i>
								<i className="far fa-ellipsis-h dropdown-button"></i>
							</div>
							<div className="tracks">
								<>
									{songs.tracks.map(track => {
										const { id, image, name, artists, explicit, duration } = track
										return (
											<TrackRow
												key={id + Math.random().toFixed(5)}
												id={id}
												rowInfo={{
													image,
													name,
													artists,
													explicit,
													duration,
												}}
											/>
										)
									})}
								</>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
