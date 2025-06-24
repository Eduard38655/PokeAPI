import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Styles from "../Styles/MainPage.module.css";
import Pokemons from "../SubComponents/Pokemons.jsx";
import SearchInput from "../SubComponents/Search.jsx";
import { PokemonContent } from "../context/PokemonData.jsx";


function HomePage() {
  const {pokemonData, setPokemonData}=useContext(PokemonContent )
  const [pokemon, setpokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const offset = currentPage * itemsPerPage;

  // Eliminar duplicados
  const sinDuplicados = eliminarDuplicados(pokemon);

  // Orden ascendente por id
  const sortedPokemon = [...sinDuplicados].sort((a, b) => a.id - b.id);

  const currentItems = sortedPokemon.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedPokemon.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  async function API(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    setpokemon((prev) => [...prev, data]);
    
  }

  useEffect(() => {
    for (let i = 1; i <= 140; i++) {
      API(i);
    }
  }, []);

  // Función para eliminar duplicados
  function eliminarDuplicados(array) {
    const ids = new Set();
    return array.filter((item) => {
      if (ids.has(item.id)) {
        return false;
      } else {
        ids.add(item.id);
        return true;
      }
    });
  }

  return (
    <article className={Styles.MainPage}>

      <div className={Styles.Header}>
        <SearchInput pokemon={pokemon} setpokemon={setpokemon} />
        
      </div>

      <Pokemons pokemon={currentItems} setpokemon={setpokemon} />

     <div className={Styles.DivPages}>
       <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
      />
     </div>
    </article>
  );
}

export default HomePage;
