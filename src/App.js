import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import './App.css';
import { ReactComponent as PokemonLogo } from './assets/pokemon-logo.svg';

function App() {
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		async function getPokemon() {
			const {
				data: { results },
			} = await axios.get('https://pokeapi.co/api/v2/pokemon/');
			setPokemon(results);
		}
		getPokemon();
	}, []);

	return (
		<>
			<PokemonLogo height="98.814" width="269.469" className="pokemon-logo"/>
			<h2 className="click-to-flip">Click the cards to flip!</h2>
			<div className="container">
				{pokemon &&
					pokemon.map((pokemon) => {
						return <Card url={pokemon.url} key={pokemon.name} />;
					})}
			</div>
		</>
	);
}

export default App;
