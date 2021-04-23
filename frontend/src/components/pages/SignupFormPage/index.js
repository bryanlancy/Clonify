import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import * as sessionActions from '../../../store/session'
import './SignupForm.css'

function SignupFormPage() {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState([])
	const history = useHistory()

	if (sessionUser) return <Redirect to="/" />

	const handleSubmit = e => {
		e.preventDefault()
		if (password === confirmPassword) {
			setErrors([])
			return dispatch(sessionActions.signup({ email, username, password })).catch(res => {
				if (res.data && res.data.errors) setErrors(res.data.errors)
			})
		}
		return setErrors(['Confirm Password field must be the same as the Password field'])
	}

	const handleLogin = () => {
		history.push('/login')
	}

	return (
		<div className="page page-user">
			<div className="signup__container">
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit} className="signup__form">
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						Email
						<input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
					</label>
					<label>
						Username
						<input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
					</label>
					<label>
						Password
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
					</label>
					<label>
						Confirm Password
						<input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
					</label>
					<button type="submit">Sign Up</button>
				</form>
				<button className="login-btn" onClick={handleLogin}>
					Log In
				</button>
			</div>
		</div>
	)
}

export default SignupFormPage
