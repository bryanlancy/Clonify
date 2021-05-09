import React, { useState } from 'react'
import * as sessionActions from '../../../store/session'
import { useDispatch } from 'react-redux'
import './SignupForm.css'

export default function LoginForm() {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState([])
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')

	const dispatch = useDispatch()

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

	return (
		<form onSubmit={handleSubmit} className="signup__form">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<label>
				What's your email?
				<input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email." required />
			</label>
			<label>
				What should we call you?
				<input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter a profile name." required />
			</label>
			<label>
				Create a password
				<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password." required />
			</label>
			<label>
				Confirm your password.
				<input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password." required />
			</label>
			<button type="submit">Sign Up</button>
		</form>
	)
}
