import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import dompurify from "dompurify";

import "./SearchItemDetail.scss";

import ErrorModal from "../../shared/UIElements/ErrorModal/ErrorModal";
import Loading from "../../shared/UIElements/Loading/Loading";
import Breadcrumb from "../../shared/UIElements/Breadcrumb/Breadcrumb";
import Price from "../../shared/UIElements/Price/Price";
import { useHttpClient } from "../../shared/hooks/http-hook";

const SearchItemDetail = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [producResult, setProductResult] = useState();
  const [categoriesResult, setCategoriesResult] = useState();
  const sanitizer = dompurify.sanitize;
  const id = useParams().id;

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/${id}`
        );
        setProductResult(responseData.body);
        setCategoriesResult(responseData.body.category_id);
      } catch (error) {}
    };
    fetchResult();
  }, [sendRequest, id]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Loading asOverlay={true} />
        </div>
      )}
      {!isLoading && producResult && (
        <div className="container">
          <div className="product-detail">
            <Breadcrumb categories={[categoriesResult]} />
            <div className="product-detail__content">
              <div className="product-detail__info">
                <div className="product-detail__img">
                  <img
                    aria-hidden
                    src={
                      producResult.pictures.length > 0
                        ? producResult.pictures[0].secure_url
                        : ""
                    }
                    alt={producResult.title + "image"}
                    width="auto"
                    height="auto"
                  />
                </div>
                <h2>Descripción del producto</h2>
                <p
                  className="product-detail__description"
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(producResult.plain_text),
                  }}
                ></p>
              </div>
              <div className="product-detail__price">
                <span className="product-detail__available-quantity">
                  {producResult.condition} - {producResult.sold_quantity}{" "}
                  Vendidos
                </span>
                <h1>{producResult.title}</h1>
                <Price
                  price={producResult.price}
                  fraction={producResult.price}
                  cents={"00"}
                  size="-lg"
                />
                <button
                  type="submit"
                  className="product-detail__price-button"
                  aria-disabled="false"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchItemDetail;
