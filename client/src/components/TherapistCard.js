import React from 'react';
import { Link } from 'react-router-dom';

export default function TherapistCard({ name, _id }) {
	return (
		<div>
			<Link to={`/users/${_id}`}>
				<h3>{name}</h3>
			</Link>
		</div>
	)
}