import React, { useState } from "react";
import axios from "axios";
import ingredients from "../helper/ingredients.json";
import cookingSvg from "../assets/undraw_cooking_lyxy (2).svg";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const IngredientsRecipe = () => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");
  const [mailSuccess, setMailSuccess] = useState("");
  const [ingredientsList, setIngredientsList] = useState([
    "Óleo",
    "Azeite",
    "Sal",
    "Farinha de Trigo",
    "Água",
  ]);
  const sendMail = () => {
    setMailSuccess("");
    if (validateEmail(email)) {
      setMailError("");
      axios
        .post("https://snak-server.herokuapp.com/recipe", {
          ingredients: ingredientsList,
        })
        .then(function (response) {
          const result = response.data.bestRecipe;
          let template = "email_sem_receita"; // nao achou
          if (result.allIngredients) {
            template = "template_xHsWf29c_clone"; // match bom
            if (!result.excessIngredients) template = "template_xHsWf29c"; // match perfeito
          } else if (!result.excessIngredients) {
            template = "template_xHsWf29c_clone"; // match bom
            if (result.allIngredients) template = "template_xHsWf29c"; // match perfeito
          }
          const ingredientsHtml = `<ul>${result.recipe.ingredients.map(
            (ing) => `<li>${ing}</li>`
          )}</ul>`.replace(/>,</g, "><");
          const stepsHtml = `<ul>${result.recipe.steps.map(
            (step) => `<li>${step}</li>`
          )}</ul>`.replace(/>,</g, "><");
          window.emailjs
            .send("gmail", template, {
              to_email: email,
              recipeTitle: result.recipe.slug,
              ingredients: ingredientsHtml,
              steps: stepsHtml,
              time: result.recipe.time.toLowerCase(),
              quantity: result.recipe.quantity,
            })
            .then((res) => {
              setMailSuccess("Enviado com sucesso.");
            })
            .catch((err) => console.error("Oh well, email failed:", err));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setMailError("Email inválido.");
    }
  };
  const setIngredients = (name) => {
    const index = ingredientsList.indexOf(name);
    if (index > -1) {
      const arrayCopy = [...ingredientsList];
      arrayCopy.splice(index, 1);
      setIngredientsList(arrayCopy);
    } else {
      setIngredientsList([name, ...ingredientsList]);
    }
  };

  return (
    <div className="row content ingredients-section">
      <div
        className={`${
          width >= 900
            ? "col-5 offset-1 text-right pt-4"
            : "col-12 text-center "
        }  my-auto`}
      >
        <img
          className={`${width >= 900 ? "cooking-svg-sm" : "cooking-svg-smoll"}`}
          src={cookingSvg}
          alt="cooking_svg"
        />
        <label htmlFor="receita" className="h3 mb-4">
          Que tal uma receita com os ingredientes que você já tem em casa?
        </label>
        <p>
          {" "}
          Basta seleciona-los {width >= 900 ? "ao lado" : "abaixo"} e partir pra
          cozinha!
        </p>
        <input
          type="email"
          className={`form-control ${mailError ? "border-error" : ""}`}
          id="receita"
          aria-describedby="emailHelp"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <small id="emailHelp" className="form-text">
          Nāo iremos compartilhar seus dados.
        </small>
        {mailError && (
          <p id="emailError" className="form-text text-danger">
            {mailError}
          </p>
        )}
        {mailSuccess && (
          <p id="emailError" className="form-text text-success">
            {mailSuccess}
          </p>
        )}
        <button className="btn btn-primary mt-3" onClick={sendMail}>
          Me manda!
        </button>
      </div>
      {width >= 900 ? (
        // desktop
        <div className="col-md-6 my-auto text-left">
          <div className="row content">
            {ingredients.map((category, i) => {
              return (
                <div key={`key__${category.slug}__${i}`} className="col-md-6">
                  <div className="card-desktop m-4">
                    <div className="card-body">
                      <label htmlFor="cardapio" className="h5 mb-4 text-orange">
                        <i className={`fas fa-${category.icon} mr-2`}></i>
                        {category.title}
                      </label>
                      <ul className="list-group ingredients-desktop list-group-flush">
                        {category.options.map((ing) => {
                          return (
                            <label
                              className="form-check-label"
                              htmlFor={`id__${ing.name}`}
                              key={`key__${ing.name}}`}
                            >
                              <li className="list-group-item">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  onChange={() => setIngredients(ing.name)}
                                  checked={ingredientsList.includes(ing.name)}
                                  id={`id__${ing.name}}`}
                                />
                                {ing.name}
                              </li>
                            </label>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // mobile
        <div className="col-md-6 my-auto text-left mx-auto pt-4">
          <div className="accordion" id="accordion">
            {ingredients.map((category, i) => {
              return (
                <div className="card" key={`card_key__${category.slug}__${i}`}>
                  <div
                    className="card-header"
                    id={`label_key__${category.slug}__${i}`}
                  >
                    <h2 className="mb-0">
                      <button
                        className={`btn btn-link btn-block text-left panel-title`}
                        type="button"
                        data-toggle="collapse"
                        data-target={`#key__${category.slug}__${i}`}
                        aria-expanded={i === 0 ? "true" : "false"}
                        aria-controls={`key__${category.slug}__${i}`}
                      >
                        <i className={`fas fa-${category.icon} mr-2`}></i>
                        {category.title}
                      </button>
                    </h2>
                  </div>
                  <div
                    id={`key__${category.slug}__${i}`}
                    className={`collapse ${i === 0 && "show"}`}
                    role="tabpanel"
                    aria-labelledby={`label_key__${category.slug}__${i}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <ul className="list-group ingredients list-group-flush">
                        {category.options.map((ing) => {
                          return (
                            <label
                              className="form-check-label"
                              htmlFor={`id__${ing.name}`}
                              key={`key__${ing.name}}`}
                            >
                              <li className="list-group-item">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  onChange={() => setIngredients(ing.name)}
                                  checked={ingredientsList.includes(ing.name)}
                                  id={`id__${ing.name}}`}
                                />
                                {ing.name}
                              </li>
                            </label>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsRecipe;
