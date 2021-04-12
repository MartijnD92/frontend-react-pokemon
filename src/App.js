import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import './App.css';
import { ReactComponent as PokemonLogo } from './assets/pokemon-logo.svg';

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
	const [error, setError] = useState('');

	async function getPokemon() {
		try {
			const {
				data: { results, next, previous },
			} = await axios.get(url);
			setPokemon({
				results: results,
				next: next,
				previous: previous,
			});
		} catch (e) {
			console.error(e);
			setError("We can't find our Pokémon! 🔎 Please try again later.");
		}
	}
	useEffect(() => {
		url && getPokemon();
	}, [url]);

	return (
		<>
			<PokemonLogo height="98.814" width="269.469" className="pokemon-logo" />
			<h2 className="click-to-flip">Click the cards to flip!</h2>
			<button
				type="button"
				className="page-btn"
				disabled={!pokemon.previous}
				onClick={() => setUrl(pokemon?.previous)}
			>
				Previous
			</button>
			<button
				type="button"
				className="page-btn"
				disabled={!pokemon.next}
				onClick={() => setUrl(pokemon?.next)}
			>
				Next
			</button>
			{error && <p className="error">{error}</p>}
			<div className="container">
				{pokemon.results &&
					pokemon.results.map((pokemon) => {
						return <Card url={pokemon.url} key={pokemon.name} />;
					})}
			</div>
			<button
				type="button"
				className="page-btn"
				disabled={!pokemon.previous}
				onClick={() => setUrl(pokemon?.previous)}
			>
				Previous
			</button>
			<button
				type="button"
				className="page-btn"
				disabled={!pokemon.next}
				onClick={() => setUrl(pokemon?.next)}
			>
				Next
			</button>
		</>
	);
}

export default App;
