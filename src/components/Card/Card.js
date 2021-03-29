import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

function Card({ url }) {
	const [singlePokemon, setSinglePokemon] = useState({});

	useEffect(() => {
		async function getSinglePokemon() {
			try {
				const {
					data: { name, weight, sprites },
				} = await axios.get(url);
				setSinglePokemon({
					name: name,
					weight: weight,
					image: sprites.other['official-artwork'].front_default,
				});
			} catch (err) {
				console.error(err);
			}
		}
		getSinglePokemon();
	}, []);

	return (
		<div className="card">
			{singlePokemon && (
				<>
					<h3 className="title">{singlePokemon.name}</h3>
					<img src={singlePokemon.image} alt={singlePokemon.name}/>
				</>
			)}
		</div>
	);
}

export default Card;
