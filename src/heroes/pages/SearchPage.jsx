import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeroCard } from "../components";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import { getHeroByName } from "../helpers/getHeroByName";

export const SearchPage = () => {
  //Información de la ubicación actual
  const location = useLocation();
  //http://localhost:5173/search?q=batman
  const { q = "" } = queryString.parse(location.search);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const navigate = useNavigate();

  const heroes = getHeroByName(q);

  const [alert, setAlert] = useState("");

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() <= 1)
      setAlert("animate__animated animate__bounceInRight");
    navigate(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Encuentra tu héroe</h1>

      <div className="row animate__animated animate__bounceInLeft">
        <div className="col-5">
          <form onSubmit={onSearchSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="Buscar héroe"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Buscar</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>

          {q === "" ? (
            <div className={`alert alert-primary ${alert}`}>
              Introduce el nombre de un héroe
            </div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger animate__animated animate__bounceInRight">
                No se encuentra el héroe <b>{q}</b>
              </div>
            )
          )}

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
