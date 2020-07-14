import React from "react";
import logo_tr from "../assets/logo-tr.png";
import bgPhoto from "../assets/bgPhoto.jpeg";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const Hero = () => {
  const { width } = useWindowDimensions();
  return (
    <div className="row content hero odd-section">
      <img src={bgPhoto} className="mx-auto bgImage" alt="Ingredients" />
      <div className="overlay-div"></div>
      <div className={`${width >= 900 ? "col-6 text-right" : "col-12 text-center"} text-light my-auto`}>
        <img src={logo_tr} className="logo" alt="logo"></img>
      </div>
      <div className={`${width >= 900 ? "col-6 text-left" : "col-12 text-center"} text-light my-auto`}>
        <p className="lead font-weight-normal">
          Descomplicando a cozinha do dia-a-dia!
        </p>
        <a className="btn btn-primary" href="#receita">
          Teste já!
        </a>
      </div>
    </div>
  );
};

export default Hero;
