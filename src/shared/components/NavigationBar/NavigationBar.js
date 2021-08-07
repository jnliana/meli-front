import React, { useReducer, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import "./NavigationBar.scss";

import Logo_ML from "../../../assets/Logo_ML.png";
import ic_Search from "../../../assets/ic_Search.png";

import { VALIDATOR_REQUIRE } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: [VALIDATOR_REQUIRE()],
      };
    case "CLEAR":
      return {
        ...state,
        value: "",
        isValid: false,
      };
    default:
      return state;
  }
};

const NavigationBar = (props) => {
  const [redirectURL, setRedirectURL] = useState();
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = encodeURI(inputState.value);
    clearFormHandler();
    setRedirectURL(value);
  };

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: [VALIDATOR_REQUIRE()],
    });
  };

  const clearFormHandler = () => {
    dispatch({
      type: "CLEAR",
    });
  };

  return (
    <React.Fragment>
      {redirectURL && <Redirect to={`/items/?search=${redirectURL}`} />}
      <nav className="main-navigation" aria-label="Main navigation">
        <div className="container">
          <Link className="main-navigation__brand" to="/" tabIndex="0">
            <img
              src={Logo_ML}
              alt="Mercado Libre Logo"
              width="53"
              height="36"
            />
          </Link>
          <form className="main-navigation__form" onSubmit={handleSubmit}>
            <div className="main-navigation__input-group">
              <label htmlFor="searchInput" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                placeholder="Buscar productos, marcas y más…"
                onChange={changeHandler}
                value={inputState.value}
              ></input>

              <button
                type="submit"
                id="button-search"
                disabled={!inputState.isValid}
              >
                <img src={ic_Search} alt="Search Icon" width="18" height="18" />
              </button>
            </div>
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavigationBar;
