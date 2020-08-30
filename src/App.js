import React from "react";
import { Switch, Route } from "react-router-dom";
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import PreMadeRecipes from "./Components/PreMadeRecipes";
import Footer from "./Components/Footer";
import IngredientsRecipe from "./Components/IngredientsRecipe";
import ResultRecipes from "./Components/ResultRecipes";

function App() {
  return (
    <div className="bg-light">
      <Switch>
        <Route
          path="/"
          render={() => {
            return <>
              <Hero />
              <Features />
              {/* <PreMadeRecipes /> */}
              <IngredientsRecipe />
            </>;
          }}
          exact
        />
        <Route
          path="/recipes/:id"
          render={(props) => <ResultRecipes {...props} />}
          exact
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
