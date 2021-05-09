import React from 'react'
import './Footer.css'

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer__title">
				<i class="fab fa-spotify"></i>
				<h2>Clonify</h2>
				<p>
					a{' '}
					<a href="https://www.spotify.com/" target="_blank">
						Spotify
					</a>{' '}
					clone.
				</p>
			</div>
			<div className="footer__useful-links">
				<p>Useful Links</p>
				<a>LinkedIn</a>
				<a>Github</a>
			</div>
		</div>
	)
}
