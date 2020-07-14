import React from "react";
import app_svg from "../assets/undraw_Mobile_app_p3ts.svg";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const features = [
  {
    name: "Match Perfeito",
    description:
      "Nos diga o que você tem na geladeira e nós te mandamos uma receita para aproveitar esses ingredientes.",
    icon: "bacon",
  },
  {
    name: "Seja um ninja da cozinha",
    description:
      "Todo dia postamos uma nova dica no nosso intagram para facilitar a cozinha nossa de cada dia.",
    icon: "carrot",
  },
  {
    name: "Cardápio semanal",
    description:
      "Fuja do frango com salada padrão! Criamos cardápios semanais com receitas simples e diferentes para o seu dia-a-dia.",
    icon: "candy-cane",
  },
];

const Features = () => {
  const { width } = useWindowDimensions();
  return (
    <div className="row content py-3">
      <div className={`${width >= 900 ? "col-6 text-right" : "col-12 text-center"} my-5`}>
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
                    <i className={`fas fa-${feat.icon} ${width >= 900 ? "fa-7x" : "fa-3x"}`}></i>
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
      <div className={`${width >= 900 ? "col-6 text-left" : "col-12 text-center"}  my-auto`}>
        <img className={`${width >= 900 ? "cooking-svg" : "cooking-svg-smoll"}`} src={app_svg} alt="app_svg"></img>
      </div>
    </div>
  );
};

export default Features;
