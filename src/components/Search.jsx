import React, {useContext, useEffect, useState} from "react";
import { MainContext} from "../MainHome";
import { useParams,useNavigate }     from 'react-router-dom'; 
import PaginatedItems from './PaginatedItems';

function Search() {
    const { productsContext, setProductsContext } = useContext(MainContext);
    const { pureProductsList, setPureProductsList } = useContext(MainContext);
    const {displayFilteredProducts, setDisplayFilteredProducts } = useContext(MainContext);
    let { query } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        document.getElementById('header-search-input').value = query;
        
        let queryTerms = query.split(' ');

        searchProducts(queryTerms);
        setTimeout(() => {
            setDisplayFilteredProducts(true);
        },1000);

        return () => {
          setPureProductsList(productsContext);
        }
    },[]);


    const searchProducts = (terms) => {
        let formatTerms = terms.map(el => el.toLowerCase());
 
        const filteredProducts = productsContext.filter(product =>
            formatTerms.some(term => product.title.toLowerCase().includes(term))
        )
     setPureProductsList(filteredProducts);

    }

    return (
      <div className="search-container-wrapper w-100">
            <div className="container">
            <div className="productinfo-wrp-prodtitle">
              <h4>Rezultatele cautarii dupa: <span className="searchprodinfo-title-query">" {query} "</span>
              </h4>{pureProductsList.length} rezultate</div>
            </div>
            <div className="container search-cont-wrapitems">
            <PaginatedItems itemsPerPage={9} />   
            </div>
      </div>
    )
  }

export default Search;