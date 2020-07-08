import React, { useState } from "react";
import ingredients from "../helper/ingredients.json";
import cookingSvg from "../assets/undraw_cooking_lyxy (2).svg";
import filterRecipe from "../helper/recipeFilter";
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const IngredientsRecipe = () => {
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");
  const [mailSuccess, setMailSuccess] = useState("");
  const [ingredientsList, setIngredientsList] = useState([
    "Óleo",
    "Azeite",
    "Sal",
    "Açucar",
    "Farinha de Trigo",
    "Água",
  ]);
  const sendMail = () => {
    setMailSuccess("");
    if (validateEmail(email)) {
      setMailError("");
      const result = filterRecipe(ingredientsList);
      let template = "email_sem_receita"; // nao achou
      if (result.allIngredients) {
        template = "template_xHsWf29c_clone"; // match bom
        if (!result.excessIngredients) template = "template_xHsWf29c"; // match perfeito
      } else if (!result.excessIngredients) {
        template = "template_xHsWf29c_clone"; // match bom
        if (result.allIngredients) template = "template_xHsWf29c"; // match perfeito
      }
      const ingredientsHtml = `<ul>${result.recipe.ingredients.map(ing => `<li>${ing}</li>`)}</ul>`.replace(/\>\,\</g,'><');;
      const stepsHtml = `<ul>${result.recipe.steps.map(step => `<li>${step}</li>`)}</ul>`.replace(/\>\,\</g,'><');
      window.emailjs
        .send("gmail", template, {
          to_email: email,
          recipeTitle: result.recipe.title,
          ingredients: ingredientsHtml,
          steps: stepsHtml,
          time: result.recipe.time.toLowerCase(),
          quantity: result.recipe.quantity
        })
        .then((res) => {
          setMailSuccess("Enviado com sucesso.");
        })
        .catch((err) => console.error("Oh well, email failed:", err));
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
      setIngredientsList([...ingredientsList, name]);
    }
  };
  return (
    <div className="row content ingredients-section">
      <div className="col-5 offset-1 pt-4 my-auto text-right">
        <img className="cooking-svg-sm" src={cookingSvg} alt="cooking_svg" />
        <label htmlFor="receita" className="h3 mb-4">
          Que tal uma receita com os ingredientes que você já tem em casa?
        </label>
        <p> Basta seleciona-los ao lado e partir pra cozinha!</p>
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
      <div className="col-md-6 my-auto text-left">
        <div className="row content">
          {ingredients.map((category, i) => {
            return (
              <div key={`key__${category.title}__${i}`} className="col-md-6">
                <div className="card m-4">
                  <div className="card-body">
                    <label htmlFor="cardapio" className="h5 mb-4 text-orange">
                      <i className={`fas fa-${category.icon} mr-2`}></i>
                      {category.title}
                    </label>
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
    </div>
  );
};

export default IngredientsRecipe;
