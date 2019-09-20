import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
	id: "",
	title: "",
	director: "",
	metascore: "",
	stars: []
};

export default function MovieUpdateForm({ match, history }) {
	const [movie, setMovie] = useState({ initialState });

	const handleChange = e =>
        setMovie({ ...movie, [e.target.name]: e.target.value });
        
	const handleSubmit = e => {
		e.preventDefault();

		axios
			.put(`http://localhost:5000/api/movies/${match.params.id}`, movie)
			.then(res => {
				console.log(res);
				setMovie(initialState);
				history.push("/");
            });
        	};

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${match.params.id}`)
			.then(response => setMovie(response.data));
	}, []);

	return (
		<div>
			<h2>Update Movie Info</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					id="title"
					value={movie.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="director"
					id="director"
					value={movie.director}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="metascore"
					id="metascore"
					value={movie.metascore}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="stars"
					id="stars"
					value={movie.stars}
					onChange={handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
