// PokemonData.jsx
import { createContext, useState } from "react";

export const PokemonContent = createContext(); // o PolemonContent, elije uno

export default function PokemonProvider({ children }) {
  const [pokemonID, setPokemonID] = useState("");
  
 
 
  return (
    <PokemonContent.Provider value={{ pokemonID, setPokemonID }}>
      {children}
    </PokemonContent.Provider>
  );
}
