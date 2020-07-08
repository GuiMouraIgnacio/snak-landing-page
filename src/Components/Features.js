import React from "react";
import app_svg from "../assets/undraw_Mobile_app_p3ts.svg";

const features = [
  {
    name: "Funcionalidade 1",
    description:
      "O porque da funcionalidade 1 ser tāo incrível e útil pro usuário.",
    icon: "bacon",
  },
  {
    name: "Funcionalidade 2",
    description:
      "O porque da funcionalidade 2 ser tāo incrível e útil pro usuário.",
    icon: "carrot",
  },
  {
    name: "Funcionalidade 3",
    description:
      "O porque da funcionalidade 3 ser tāo incrível e útil pro usuário.",
    icon: "candy-cane",
  },
  {
    name: "Funcionalidade 4",
    description:
      "O porque da funcionalidade 4 ser tāo incrível e útil pro usuário.",
    icon: "cheese",
  },
];

const Features = () => {
  return (
    <div className="row content py-3">
      <div className="col-md-6 my-5 text-right">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            {features.map((feat, i) => (
              <li
                key={`car_key_${feat.name}`}
                data-target="#myCarousel"
                data-slide-to={i}
                className={i === 0 ? "active" : ""}
              />
            ))}
          </ol>
          <div className="carousel-inner">
            {features.map((feat, i) => (
              <div
                key={`div_key_${feat.name}`}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <div className="container">
                  <div className="carousel-caption text-left">
                    <i className={`fas fa-${feat.icon} fa-7x`}></i>
                    <h1>{feat.name}</h1>
                    <p>{feat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Anterior</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Próximo</span>
          </a>
        </div>
      </div>
      <div className="col-md-6 text-left my-auto">
        <img className="cooking-svg" src={app_svg} alt="app_svg"></img>
      </div>
    </div>
  );
};

export default Features;
