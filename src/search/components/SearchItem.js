import React from "react";
import { Link } from "react-router-dom";

import "./SearchItem.scss";

import Price from "../../shared/UIElements/Price/Price";

const SearchItem = (props) => {
  return (
    <div className="search-item">
      <div className="search-item__img">
        <img
          aria-hidden
          src={props.properties.thumbnail}
          width="180"
          height="auto"
          alt={props.properties.title + "image"}
        ></img>
      </div>
      <div className="search-item__detail">
        <Price
          price={
            props.properties.prices.prices.length > 0
              ? props.properties.prices.prices[0].amount
              : ""
          }
          fraction={
            props.properties.prices.prices.length > 0
              ? props.properties.prices.prices[0].amount
              : ""
          }
          cents={"00"}
          size="-sm"
          shipping={props.properties.shipping.free_shipping}
        />
        <Link
          to={`/items/${props.properties.id}`}
          className="search-item__detail-link"
        >
          <h2 className="search-item__detail-title">
            {props.properties.title}
          </h2>
        </Link>
      </div>
      <div className="search-item__location">
        <span>{props.properties.address.state_name}</span>
      </div>
    </div>
  );
};

export default SearchItem;
