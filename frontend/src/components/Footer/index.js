import React from 'react'
import './Footer.css'

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer__title">
				<i class="fab fa-spotify"></i>
				<h3>Clonify</h3>
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

				<div>
					<a href="https://github.com/bryanlancy/Clonify" target="_blank">
						Github
					</a>
				</div>

				<div>
					<a href="">My portfolio - NEED TO ADD</a>
				</div>
			</div>
			<div className="footer__other-projects">
				<p>My Other Projects</p>
				<div className="project-link">
					<a href="https://merrymenstocks.herokuapp.com/" target="_blank">
						MerryMen
					</a>
					<p>a Robinhood clone</p>
				</div>
				<div className="project-link">
					<a href="https://www.fetchigram.com/" target="_blank">
						Fetch
					</a>
					<p>an Instagram clone</p>
				</div>
				<div className="project-link">
					<a href="https://queit.herokuapp.com/" target="_blank">
						QueIt
					</a>
					<p>a Quora clone</p>
				</div>
			</div>
			<div className="footer__connect">
				<p>Connect With Me</p>
				<div>
					<a href="https://www.linkedin.com/in/bryan-burns-b45006116/" target="_blank">
						LinkedIn
					</a>
				</div>
				<div>
					<a href="">AngelList - NEED TO ADD</a>
				</div>
			</div>
		</div>
	)
}
