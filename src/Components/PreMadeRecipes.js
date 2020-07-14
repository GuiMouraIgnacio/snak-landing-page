import React, { useState } from "react";
import mail_svg from "../assets/undraw_team_chat_y27k.svg";
import useWindowDimensions from "../Hooks/useWindowDimensions";

window.emailjs.init("user_B2HQxr3hJ1YbTQ7vZoEDh");

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const PreMadeRecipes = () => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");
  const [mailSuccess, setMailSuccess] = useState("");
  const sendMail = () => {
    setMailSuccess("");
    if (validateEmail(email)) {
      setMailError("");
      window.emailjs
        .send("gmail", "email_card_pio_semanal", {
          to_email: email,
        })
        .then((res) => {
          setMailSuccess("Enviado com sucesso.");
        })
        .catch((err) => console.error("Oh well, email failed:", err));
    } else {
      setMailError("Email inválido.");
    }
  };
  return (
    <div className="footer text-light py-4">
      <div className="row content">
        <div className={`${width >= 900 ? "col-7 text-center" : "col-12 text-center"}  my-auto`}>
          <img className={`${width >= 900 ? "cooking-svg" : "cooking-svg-smoll"}`} src={mail_svg} alt="mail_svg"></img>
        </div>
        <div className={`${width >= 900 ? "col-4 text-left" : "col-12 text-center"} my-auto`}>
          <div className="form-group">
            <label htmlFor="cardapio" className="h3 mb-4">
              Quer um cardápio pronto pra essa semana?
            </label>
            <input
              type="email"
              className={`form-control ${mailError ? "border-error" : ""}`}
              id="cardapio"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <small id="emailHelp" className="form-text text-light">
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
            <button className="btn btn-secondary mt-3" onClick={sendMail}>
              Pode mandar!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreMadeRecipes;
