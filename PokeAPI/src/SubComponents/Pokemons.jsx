import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../Styles/Pokemon.module.css";
import { PokemonContent } from "../context/PokemonData.jsx";

function Pokemons({ pokemon }) {
  const { setPokemonID } = useContext(PokemonContent);
  const navigate = useNavigate();

  const handleClick = (id) => {
    setPokemonID(id);
    navigate("/Pokemon_Detalles");
  };

  return (
    <div className={Styles.DivContainer}>
      <div className={Styles.Subcontainer}>
        {pokemon.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={Styles.DivCards}
          >
            <img src={item.sprites.front_default} alt={item.name} />
            <h2>{item.name}</h2>
            <span>#{item.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokemons;
