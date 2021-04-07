import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updateSongLink } from '../../store/songbar'

import './Card.css'

export default function Card({ id, type, cardInfo }) {
	const history = useHistory()
	const dispatch = useDispatch()

	const { image, title, text } = cardInfo

	function updatePlayer(e) {
		e.stopPropagation()
		dispatch(updateSongLink(`https://open.spotify.com/embed/${type}/${id}`))
	}
	function navigate(id) {
		history.push(`/${type}/${id}`)
	}

	return (
		<div
			className="card"
			onClick={() => {
				navigate(id)
			}}
		>
			<div className="square">
				<div className="card__image-container" style={{ backgroundImage: `url(${image})` }}>
					<div className="card__play-button" onClick={updatePlayer}>
						<i className="fas fa-play"></i>
					</div>
				</div>
			</div>
			<div className="card__info">
				<b>{title}</b>
				<p>{text}</p>
			</div>
		</div>
	)
}
