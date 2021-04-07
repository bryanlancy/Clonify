import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { updateSongLink } from '../../../store/songbar'

import './TrackRow.css'

export default function TrackRow({ id, rowInfo }) {
	//liked state??
	const dispatch = useDispatch()
	const history = useHistory()
	const [isLiked, setIsLiked] = useState(false)
	const { openUrl, image, name, artists, explicit, duration } = rowInfo

	function convertTime(ms) {
		const minutes = ms / 1000 / 60
		const seconds = (minutes % 1).toFixed(4) * 60
		return `${Math.floor(minutes)}:${String(Math.floor(seconds)).padStart(2, '0')}`
	}

	function updatePlayer(e) {
		e.preventDefault()
		e.stopPropagation()
		dispatch(updateSongLink(`https://open.spotify.com/embed/track/${id}`))
	}

	function navigate(link) {
		console.log('', link)
		history.push(link)
	}

	function toggleLike() {
		setIsLiked(!isLiked)
	}

	return (
		<div className="track-result__row">
			<div className="track-result__row-info">
				<div className="track-result__image-container" onClick={updatePlayer}>
					<div className="track-result__row-overlay">
						<i className="fas fa-play"></i>
					</div>
					<img className="track-result__row-image" src={image} />
				</div>
				<div className="track-result__row-text">
					<b>{name}</b>
					<div className="track-result__row-artist">
						{explicit && <span className="track-result__row-explicit">E</span>}
						<div className="track-result__row-artist-list">
							{artists.map(artist => {
								return (
									<p className="track-result__row-artist-link" onClick={() => navigate(`/artist/${artist.id}`)}>
										{artist.name}
									</p>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="track-result__row-buttons">
				<i className={`${isLiked ? 'fas is-liked' : 'fal'} fa-heart heart-button`} style={{ color: isLiked ? '#1db954' : '' }} onClick={toggleLike}></i>
				<p className="track-result__row-duration">{convertTime(duration)}</p>
				<i className="far fa-ellipsis-h track-options"></i>
			</div>
		</div>
	)
}
