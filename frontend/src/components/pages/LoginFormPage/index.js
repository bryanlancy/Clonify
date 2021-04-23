import React, { useState } from 'react'
import * as sessionActions from '../../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './LoginForm.css'

function LoginFormPage() {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const [credential, setCredential] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState([])
	const history = useHistory()

	if (sessionUser) return <Redirect to="/" />

	const handleSubmit = e => {
		e.preventDefault()
		setErrors([])
		return dispatch(sessionActions.login({ credential, password })).catch(res => {
			if (res.data && res.data.errors) setErrors(res.data.errors)
		})
	}
	const handleSignup = () => {
		history.push('/signup')
	}

	return (
		<div className="page page-user">
			<div className="login__container">
				<h1>Log In</h1>
				<form onSubmit={handleSubmit} className="login__form">
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						Username or Email
						<input type="text" value={credential} onChange={e => setCredential(e.target.value)} required />
					</label>
					<label>
						Password
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
					</label>
					<button type="submit">Log In</button>
				</form>
				<button className="signup-btn" onClick={handleSignup}>
					Sign Up
				</button>
			</div>
		</div>
	)
}

export default LoginFormPage
