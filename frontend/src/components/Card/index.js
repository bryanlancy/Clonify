import React from 'react'

export default function Card({ cardInfo }) {
	const testImg = 'https://i.scdn.co/image/89b92c6b59131776c0cd8e5df46301ffcf36ed69'

	return (
		<div className="card">
			<img src={testImg} alt="test" />
		</div>
	)
}
