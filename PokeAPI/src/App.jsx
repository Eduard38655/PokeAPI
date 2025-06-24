import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/Components/Homepage.jsx";
import PokemonDetalles from "../src/Components/PokemonDetalles.jsx";
import PokemonProvider from "../src/context/PokemonData.jsx";
function App() {
 
  return (
      <PokemonProvider>
     

     <BrowserRouter basename="/PokeAPI" >
     <Routes>
      <Route path={"/"} element={<HomePage/>}  /> 
      <Route path={"/Pokemon_Detalles"} element={<PokemonDetalles/>}  /> 
     </Routes>
     </BrowserRouter>
    </  PokemonProvider>
  )
}

export default App
