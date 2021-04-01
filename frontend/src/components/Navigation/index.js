import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal'
import './Navigation.css'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)

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
			<ul>
				<li>
					<NavLink exact to="/">
						Home
						<i className="far fa-chevron-left"></i>
						<i className="far fa-chevron-right"></i>
					</NavLink>
					{isLoaded && sessionLinks}
				</li>
			</ul>
		</div>
	)
}

export default Navigation
