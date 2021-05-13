import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import NavigationSimple from '../../NavigationSimple'
import SignupForm from '../../forms/SignupForm'
import Footer from '../../Footer'
import './SignupFormPage.css'

function SignupFormPage() {
	const sessionUser = useSelector(state => state.session.user)

	const history = useHistory()

	if (sessionUser) return <Redirect to="/" />

	const handleLogin = () => {
		history.push('/login')
	}

	return (
		<div className="page-user">
			<NavigationSimple />
			<div className="signup__container">
				<h2>Sign up for free to start listening.</h2>
				<SignupForm />
				<p>
					Already have an account?{' '}
					<span className="signup__login" onClick={handleLogin}>
						Log in
					</span>
					.
				</p>
			</div>
			<Footer />
		</div>
	)
}

export default SignupFormPage
