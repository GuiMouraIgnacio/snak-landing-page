import React from "react";
import logo_tr from "../assets/logo-tr.png";
import bgPhoto from "../assets/bgPhoto.jpeg";

const Hero = () => {
  return (
    <div className="row content hero odd-section">
      <img src={bgPhoto} className="mx-auto bgImage" alt="Ingredients" />
      <div className="overlay-div"></div>
      <div className="col-md-6 text-right text-light my-auto">
        <img src={logo_tr} className="logo" alt="logo"></img>
      </div>
      <div className="col-md-6 text-left text-light my-auto">
        <p className="lead font-weight-normal">
          Descomplicando a cozinha do dia-a-dia!
        </p>
        <a className="btn btn-primary" href="#cardapio">
          Teste já!
        </a>
      </div>
    </div>
  );
};

export default Hero;
