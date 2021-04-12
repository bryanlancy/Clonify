import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal'
import './Navigation.css'

function Navigation({ isLoaded }) {
	const history = useHistory()

	const sessionUser = useSelector(state => state.session.user)

	function navigate(goBack) {
		if (goBack) history.goBack()
		else history.goForward()
	}

	let sessionLinks
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<NavLink to="/signup">Sign Up</NavLink>
			</>
		)
	}

	return (
		<div className="navbar">
			<div className="navbar__buttons">
				<div className="navbar__history-buttons">
					<div className="navbar__history-btn" onClick={() => navigate(1)}>
						<i className="far fa-chevron-left"></i>
					</div>
					<div className="navbar__history-btn" onClick={() => navigate(0)}>
						<i className="far fa-chevron-right"></i>
					</div>
				</div>
				<div
					className="navbar__search-btn"
					onClick={() => {
						history.push('/search')
					}}
				>
					<i className="far fa-search"></i>
					{/* <input type="text" /> */}
				</div>
			</div>

			{isLoaded && sessionLinks}
		</div>
	)
}

export default Navigation
