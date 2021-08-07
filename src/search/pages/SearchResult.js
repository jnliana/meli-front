import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./SearchResult.scss";

import Breadcrumb from "../../shared/UIElements/Breadcrumb/Breadcrumb";
import ErrorModal from "../../shared/UIElements/ErrorModal/ErrorModal";
import Loading from "../../shared/UIElements/Loading/Loading";
import SearchList from "../components/SearchList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const SearchResult = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { search } = useLocation();
  const keyword = search.replace("?search=", "");
  const [loadedResult, setLoadedResult] = useState();
  const [categoriesResult, setCategoriesResult] = useState();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items?q=${decodeURI(keyword)}`
        );
        const sliceResult =
          responseData.body && responseData.body.results.length > 0
            ? responseData.body.results.slice(0, 4)
            : [];
        setLoadedResult(sliceResult);
        const filters =
          responseData.body.filters.length > 0
            ? responseData.body.filters[0].values
            : [];
        setCategoriesResult(filters);
      } catch (error) {}
    };
    fetchResult();
  }, [sendRequest, keyword]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Loading asOverlay={true} />
        </div>
      )}
      {!isLoading && loadedResult && (
        <div>
          <Breadcrumb categories={categoriesResult} />
          <div className="search-container">
            <SearchList results={loadedResult} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchResult;
