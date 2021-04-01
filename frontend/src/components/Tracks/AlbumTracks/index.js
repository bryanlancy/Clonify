import React from 'react'
import './AlbumTracks.css'

export default function AlbumTracks({ isLiked, setIsLiked }) {
	function changeLike() {
		setIsLiked(!isLiked)
	}

	return (
		<div className="tracks">
			<div className="buttons">
				<div className="play-button">
					<i className="fas fa-play"></i>
				</div>
				<i className={`${isLiked ? 'fas' : 'fal'} fa-heart heart-button`} onClick={changeLike} style={{ color: isLiked ? '#1db954' : '' }}></i>
				<i className="far fa-ellipsis-h dropdown-button"></i>
			</div>
			<h1>AlbumTracksComponent</h1>
		</div>
	)
}
