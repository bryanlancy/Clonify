import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { checkText, updatePlayer } from '../../utils'

import './Card.css'

export default function Card({ id, type, cardInfo }) {
	const history = useHistory()
	const dispatch = useDispatch()

	const { image, title, text } = cardInfo

	function navigate(id) {
		if (type !== 'track') history.push(`/${type}/${id}`)
	}

	return (
		<div className="card" onClick={() => navigate(id)}>
			<div className="square">
				<div className="card__image-container" style={{ backgroundImage: `url(${image})`, borderRadius: type === 'artist' ? '50%' : '4px' }}>
					<div className="card__play-button" onClick={e => updatePlayer(dispatch, e, type, id)}>
						<i className="fas fa-play"></i>
					</div>
				</div>
			</div>
			<div className="card__info">
				<b>{title}</b>
				{text && <p>{checkText(text, type === 'artist' ? 25 : 50)}</p>}
			</div>
		</div>
	)
}
