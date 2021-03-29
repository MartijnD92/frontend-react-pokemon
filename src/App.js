import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import './App.css';

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
    <h1>Pokémon</h1>
		<div className="container">
			{pokemon &&
				pokemon.map((pokemon) => {
					return <Card url={pokemon.url} key={pokemon.name}/>;
				})}
		</div>
    </>
	);
}

export default App;
