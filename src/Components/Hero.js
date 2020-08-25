import React from "react";
import logo_tr from "../assets/logo-tr.png";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const Hero = () => {
  const { width } = useWindowDimensions();
  return (
    <div className="row content hero odd-section">
      <div className="overlay-div"></div>
      <div className={`${width >= 900 ? "col-6 text-right" : "col-12 text-center"} text-light my-auto`}>
        <img src={logo_tr} className="logo" alt="logo"></img>
      </div>
      <div className={`${width >= 900 ? "col-6 text-left" : "col-12 text-center"} text-light my-auto`}>
        <p className={`${width >= 900 ? "h1" : "h3"} font-weight-normal`}>
          Descomplicando a
        </p>
        <p className={`${width >= 900 ? "h1" : "h3"} font-weight-normal`}>
          cozinha do dia-a-dia!
        </p>
        <a className="btn btn-secondary" href="#receita">
          Teste já!
        </a>
      </div>
    </div>
  );
};

export default Hero;
