import { useState } from "react";
import Styles from "../Styles/Categorias.module.css";

function Categorias({ pokemon, setPokemon, initialPokemon }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   

  return (
    <div className={Styles.DivCategorias}>
      <h3>Filter by type</h3>
      {error && <p className={Styles.Error}>{error}</p>}
      <div className={Styles.Categorias_Names}>
        <button onClick={() => handleFilter("all")} disabled={loading}>
          All
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => handleFilter(categoria)}
            disabled={loading}
          >
            {categoria}
          </button>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Categorias;
