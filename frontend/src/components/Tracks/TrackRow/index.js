import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addLike, removeLike } from '../../../store/likes'

import { checkText, updatePlayer } from '../../../utils'

import './TrackRow.css'

export default function TrackRow({ id, rowInfo }) {
	//liked state??
	const dispatch = useDispatch()
	const history = useHistory()
	const { user } = useSelector(state => state.session)
	const { [id]: like } = useSelector(state => state.likes)
	const [isLiked, setIsLiked] = useState(like ? true : false)

	function convertTime(ms) {
		const minutes = ms / 1000 / 60
		const seconds = (minutes % 1).toFixed(4) * 60
		return `${Math.floor(minutes)}:${String(Math.floor(seconds)).padStart(2, '0')}`
	}

	function navigate(link) {
		history.push(link)
	}

	async function toggleLike() {
		if (isLiked) {
			setIsLiked(await dispatch(removeLike(user.id, id)))
		} else {
			setIsLiked(await dispatch(addLike(user.id, id, 'track')))
		}
	}

	const { image, name, artists, explicit, duration, number } = rowInfo
	return (
		<div className="track-result__row">
			<div className="track-result__row-info">
				<div className="track-result__image-container" onClick={e => updatePlayer(dispatch, e, 'track', id)}>
					<div className="track-result__row-overlay">
						<i className="fas fa-play"></i>
					</div>
					{image && <img alt="album-cover" className="track-result__row-image" src={image} />}
					{!image && <p className="track-result__number">{number}</p>}
				</div>
				<div className="track-result__row-text">
					<b>{checkText(name, 50)}</b>
					<div className="track-result__row-artist">
						{explicit && <span className="track-result__row-explicit">E</span>}
						<div className="track-result__row-artist-list">
							{checkText(
								artists.map(artist => {
									return (
										<p key={artist.id} className="track-result__row-artist-link" onClick={() => navigate(`/artist/${artist.id}`)}>
											{artist.name}
										</p>
									)
								}),
								10
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="track-result__row-buttons">
				<i className={`${isLiked ? 'fas is-liked' : 'fal'} fa-heart heart-tracks`} style={{ color: isLiked ? '#1db954' : '' }} onClick={toggleLike}></i>
				<p className="track-result__row-duration">{convertTime(duration)}</p>
				<i className="far fa-ellipsis-h track-options"></i>
			</div>
		</div>
	)
}
