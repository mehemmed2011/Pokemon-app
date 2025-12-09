import { useState } from 'react'
import './App.css'


const allPokemons = [
  { id: 25, name: "Pikachu", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { id: 1, name: "Bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
  { id: 4, name: "Charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
  { id: 7, name: "Squirtle", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
  { id: 133, name: "Eevee", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" },
];

export default function App() {
  const [team, setTeam] = useState([]);

  const addPokemon = (pokemon) => {
    if (!team.some(p => p.id === pokemon.id)) {
      setTeam([...team, { ...pokemon, count: 1 }]);
    }
  };

  const increment = (id) => {
    setTeam(team.map(p => p.id === id ? { ...p, count: p.count + 1 } : p));
  };

  const decrement = (id) => {
    setTeam(team.map(p =>
      p.id === id && p.count > 1 ? { ...p, count: p.count - 1 } : p
    ));
  };

  const remove = (id) => {
    setTeam(team.filter(p => p.id !== id));
  };

  return (
       <div className="container">

      <h1>Pokémon Team Manager</h1>

      <div className="pokemon-list">
        {allPokemons.map(p => (
          <div className="card" key={p.id}>
            <img src={p.img} />
            <h3>{p.name}</h3>
            <button onClick={() => addPokemon(p)}>Add to Team</button>
          </div>
        ))}
      </div>

      <h2>Your Pokémon Team</h2>

      {team.map(p => (
        <div className="team-item" key={p.id}>
          <img src={p.img} />
          <span>{p.name}</span>

          <button className="minus" onClick={() => decrement(p.id)}>–</button>
          <span className="count">{p.count}</span>
          <button className="plus" onClick={() => increment(p.id)}>+</button>

          <button className="remove" onClick={() => remove(p.id)}>Remove</button>
        </div>
      ))}

      <h2>Total Pokémon in Team: {
        team.reduce((total, p) => total + p.count, 0)
      }</h2>
    </div>
  )
}

