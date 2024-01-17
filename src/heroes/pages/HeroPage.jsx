import React from "react";
import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroeById } from "../helpers";

export const HeroPage = () => {
  const { id } = useParams();
  const hero = useMemo(() => getHeroeById(id), [id]);

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  if (!hero) return <Navigate to={`/marvel`} />;

  return (
    <div className="row mt-5 animate__animated animate__bounceInLeft">
      <div className="col-4 ">
        <img
          className="img-thumbnail"
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
        />
      </div>

      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter Ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance:</b> {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-primary" onClick={onBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
