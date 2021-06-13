import React from 'react'

import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './LoginFormPage.css'

import LoginForm from '../../forms/LoginForm'
import Footer from '../../Footer'
import NavigationSimple from '../../NavigationSimple'

function LoginFormPage() {
	const sessionUser = useSelector(state => state.session.user)

	const history = useHistory()

	if (sessionUser) return <Redirect to="/" />

	const handleSignup = () => {
		history.push('/signup')
	}

	let socialLinks
	if (false) {
		socialLinks = (
			<div className="login-social">
				<div className="login-social__links">
					<button className="social-facebook">
						<i className="fab fa-facebook login-social__icon"></i>Continue with Facebook
					</button>
					<button className="social-apple">
						<i className="fab fa-apple login-social__icon"></i>Continue with Apple
					</button>
					<button className="social-google">
						<i className="fab fa-google login-social__icon"></i>Continue with Google
					</button>
				</div>
				<div className="divider-container">
					<hr />
					<p>OR</p>
				</div>
			</div>
		)
	}

	return (
		<div className="page-user">
			<NavigationSimple />
			<div className="login__container">
				<h3>To continue, log in to Clonify.</h3>
				{socialLinks}
				<LoginForm />
				<hr />
				<div className="login__signup">
					<p>Don't have an account?</p>
					<button className="signup-btn" onClick={handleSignup}>
						Sign Up
					</button>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default LoginFormPage
