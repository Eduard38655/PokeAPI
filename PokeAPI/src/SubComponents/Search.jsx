import Styles from "../Styles/Search.module.css";

function SearchInput({ pokemon, setPokemon }) {
  

  

  return (
    <div className={Styles.DivSeaarch}>
      <div className={Styles.Title}>
        <h1>PokeDex Explorer</h1>
        <img
          src="https://th.bing.com/th/id/OIP.-bkOSMzRLZ19YuIEXU9VkgHaHa?r=0&rs=1&pid=ImgDetMain"
          alt="Pokedex logo"
        />
      </div>
 
    </div>
  );
}

export default SearchInput;
