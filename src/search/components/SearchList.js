import React from "react";

import SearchItem from "./SearchItem";

import "./SearchList.scss";

const SearchList = (props) => {
  if (props.results.length === 0) {
    return (
      <div className="center">
        <h2>No found items.</h2>
      </div>
    );
  }
  return (
    <React.Fragment>
      {props.results.map((item, i) => {
        return <SearchItem key={i} properties={item} />;
      })}
    </React.Fragment>
  );
};
export default SearchList;
