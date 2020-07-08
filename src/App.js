import React from "react";
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import PreMadeRecipes from "./Components/PreMadeRecipes";
import Footer from "./Components/Footer";
import IngredientsRecipe from "./Components/IngredientsRecipe";

function App() {
  return (
    <div className="bg-light">
      <Hero />
      <Features />
      <PreMadeRecipes />
      <IngredientsRecipe />
      <Footer/>
    </div>
  );
}

export default App;
