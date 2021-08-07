import React from "react";

import "./Price.scss";

import ic_shipping from "../../../assets/ic_shipping.png";

const Price = (props) => {
  return (
    <span
      className="price-tag"
      itemProp="offers"
      itemType="http://schema.org/Offer"
    >
      <span className="sr-only">{props.price}</span>
      <span
        className={"price-tag-symbol" + props.size}
        itemProp="priceCurrency"
      >
        $
      </span>
      <span className={"price-tag-fraction" + props.size}>
        {props.fraction}
      </span>
      <span className={"price-tag-cents" + props.size}>{props.cents}</span>
      {props.shipping && (
        <img
          className="free-shiping"
          src={ic_shipping}
          width="24"
          height="24"
          alt="Free shipping"
        />
      )}
    </span>
  );
};
export default Price;
