import { useContext, useEffect, useState } from "react";
import { PokemonContent } from "../context/PokemonData.jsx";
import Styles from "../Styles/PokemonDetalles.module.css";
import SearchInput from "../SubComponents/Search.jsx";

function PokemonDetalles() {
  const { setPokemonData } = useContext(PokemonContent);
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [devolutionChain, setDevolutionChain] = useState([]);
const {pokemonID, setPokemonID}=useContext(PokemonContent)

console.log(pokemonID);

  useEffect(() => {
    

    async function fetchData() {
      // Fetch basic Pokemon data
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      const data = await res.json();
      setPokemon(data);
      

      // Fetch species for description and evolution chain URL
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
      const speciesData = await speciesRes.json();
      // Description
      const flavor = speciesData.flavor_text_entries.find(e => e.language.name === "en");
      setDescription(flavor ? flavor.flavor_text.replace(/\n|\f/g, " ") : "");

      // Fetch evolution chain
      if (speciesData.evolution_chain?.url) {
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        parseEvolution(evoData.chain);
      }
    }

    fetchData();
  }, [setPokemonData]);

  // Recursive parse for evolution and devolution
  function parseEvolution(chain, pre = null) {
    const name = chain.species.name;
    if (pre) {
      setDevolutionChain(prev => [...prev, pre]);
    }
    setEvolutionChain(prev => [...prev, name]);
    if (chain.evolves_to.length > 0) {
      parseEvolution(chain.evolves_to[0], name);
    }
  }

  if (!pokemon) return <div>Cargando...</div>;

  // Calculate height in meters and weight in kilograms
  const heightMeters = (pokemon.height * 0.1).toFixed(2);
  const weightKg = (pokemon.weight * 0.1).toFixed(2);

  return (
    <>
      <SearchInput />
      <div className={Styles.DetallesContainer}>

      <button onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" /> Back
      </button>

      <div className={Styles.PokemonInfo}>
        {/* Use official artwork from sprites.other.images */}
       <h2>{pokemon.name}</h2>
        <span># {pokemon.id}</span>

        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          width={300}
          height={300}
        />
         
    <div className={Styles.DivTypes}>
       
        <ul>
          {pokemon.types.map((typeObj, i) => (
            <li key={i}>{typeObj.type.name}</li>
          ))}
        </ul>
      </div>

      {description && (
        <div className={Styles.Description}>
          
          <p>{description}</p>
        </div>
      )}

        
 </div>

<div className={Styles.Container_Habilities}>


 
      <div className={Styles.DivHeight}>
        <h3>Details</h3>
        <br />
        <p><strong>Height:</strong> <span>{heightMeters} m</span> </p>
        <p><strong>Weight:</strong> <span>{weightKg} kg</span> </p>
      </div>


 <div className={Styles.DivAbilities}>
        <h3>Abilities</h3>
        <br />
        <ul>
          {pokemon.abilities.map((abilityObj, i) => (
            <li key={i}>
              {abilityObj.ability.name}  <span>{abilityObj.is_hidden ? "(Oculta)" : "(Normal)"}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={Styles.DivBars}>
        <h3>Base Stats</h3>
        <br />
        <ul>
          {pokemon.stats.map((statObj, i) => (
            <li key={i}>
              <p><strong>{statObj.stat.name}:</strong> <span>{statObj.base_stat}</span></p>
            <br />
            <div className={Styles.Div}>
          <div className={Styles.DivName}>

            </div>
            </div>
             
            </li>
          ))}
        </ul>
      </div>


</div> 
 
 

      </div>
    </>
  );
}

export default PokemonDetalles;
