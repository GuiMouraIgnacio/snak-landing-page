import React from "react";
import cheff_svg from "../assets/undraw_Chef_cu0r.svg";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { extractDigits } from "../helper/helper";

const ResultRecipes = ({ location: { state = {} } = {} } = {}) => {
  const { width } = useWindowDimensions();
  const history = useHistory();
  console.log(state);

  const generateAmount = (recipe) => {
    const quantity = extractDigits(recipe.amount);
    if (!quantity || quantity === 0 || quantity === "0")
      return "Quantidade não informada.";

    if (quantity === 1 || quantity === "1") return `1 porçåo`;
    return `${quantity} porçōes.`;
  };

  const generateTime = (recipe) => {
    const time = recipe.time.toLowerCase();
    if (time === "0min" || !time || time === 0) {
      return "Não informado.";
    }
    return time;
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <main role="main" className="fsHeight row content">
      <section
        className={`${
          width >= 900 ? "col-4 text-right" : "col-12 text-center"
        } jumbotron content`}
      >
        <img className={`cooking-svg-smoll`} src={cheff_svg} alt="cheff_svg" />
        <div className="container content text-orange">
          <h1>Ta na mão!</h1>
          <p className="lead text-orange">
            Vejas as receitas selecionadas pra você!
          </p>
        </div>
      </section>
      <div
        className={`${width >= 900 ? "col-8" : "col-10 offset-1"} album py-5`}
      >
        <div className="container">
          <div className="row">
            {state.result.map((recipe, i) => (
              <a
                key={`${recipe.name}_${i}`}
                href={recipe.url}
                className={`${width >= 900 ? "col-md-4" : "col-12"}`}
              >
                <div className="card mb-4 shadow-sm">
                  <img
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    alt="recipe"
                    aria-label="Placeholder: Thumbnail"
                    src={
                      recipe.image ||
                      "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"
                    }
                  />
                  <div className="card-body footer text-light">
                    <h4 className=" h4card-text mb-3">{recipe.name}</h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <small>
                        <i className="far fa-clock mr-2"></i>
                        {generateTime(recipe)}
                      </small>
                      <small className="text-right">{generateAmount(recipe)}</small>
                    </div>
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                      <small>
                        <i className="fas fa-link mr-2"></i>
                        {recipe.source}
                      </small>
                      <small>
                        <i className="fas fa-thumbs-up mr-2"></i>
                        {recipe.likes}
                      </small>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={goBack}>
            Voltar
          </button>
        </div>
      </div>
    </main>
  );
};

export default ResultRecipes;
