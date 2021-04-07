import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

function Card({ url }) {
	const [singlePokemon, setSinglePokemon] = useState({});
	const [isFlipped, toggleIsFlipped] = useState(false);

	useEffect(() => {
		async function getSinglePokemon() {
			try {
				const {
					data: { name, weight, sprites, abilities, moves, types },
				} = await axios.get(url);
				setSinglePokemon({
					name: name,
					weight: weight,
					image: sprites.other['official-artwork'].front_default,
					abilities: abilities,
					moves: moves,
					types: types,
				});
			} catch (err) {
				console.error(err);
			}
		}
		getSinglePokemon();
	}, []);

	return (
		<div className="scene scene--card">
			<div
				// className={`card ${singlePokemon.types
				// 	?.map((type) => type.type.name)
				// 	.join(' ')} ${isFlipped ? 'is-flipped' : ''}`}
				className="card"
				onClick={() => toggleIsFlipped(!isFlipped)}
			>
				<div className={`card__face card__face--front ${singlePokemon.types?.[0].type.name}`}>
					<img
						className="sprite"
						src={singlePokemon.image}
						alt={singlePokemon.name}
					/>
					<h3 className="title">{singlePokemon.name}</h3>
					<div className="stats">
						<p className="weight">Weight: {singlePokemon.weight / 10} kg</p>
						{
							<p className="moves-length">
								Moves: {singlePokemon.moves?.length}
							</p>
						}
					</div>
				</div>
				<div className="card__face card__face--back">
					<h3 className="title">Abilities</h3>
					<ul className="abilities">
						{singlePokemon.abilities?.map((ability) => (
							<li key={ability.ability.name}>{ability.ability.name}</li>
						))}
					</ul>
					<h3 className="title">Moves</h3>
					<ul className="moves-list">
						{singlePokemon.moves?.map(
							(move, index) =>
								index < 4 && <li key={move.move.name}>{move.move.name}</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Card;
