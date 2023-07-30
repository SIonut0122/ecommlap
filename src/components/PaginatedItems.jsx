import React, { useEffect, useState,useContext } from 'react';
import { MainContext} from "../MainHome";
import ReactStars from "react-rating-stars-component";
import AddToCartBtn from './modules/addtocartbtn';
import AddToFavorites from './modules/addtofavbtn';
import RemoveFavorite from './modules/removefavorite';
import {Link }     from 'react-router-dom'; 
import ReactPaginate from 'react-paginate';

 

function Items({ currentItems }) {
  const {displayFilteredProducts} = useContext(MainContext);
  


  return (
    <>
      {currentItems.length > 0 ? (
        <>
          {currentItems.map((el,ind) => 
              <div className='allprod-wrpdwrap-proditem allprod-wrpdwrap-proditem-grid' 
              style={{opacity: !displayFilteredProducts ? '0.5': '1', pointerEvents: !displayFilteredProducts ? 'none': 'visible'}}
              key={el.id}>
                        <div className='allprod-product-thumb'>
                        <span className="allprod-thumb-fav">
                                  {!el.addedToFav ? (
                                    <AddToFavorites iclassname='allprod-addfav-false atcrecom-addfav-false' addToFavTxt='' addedProductToFav={el}/>
                                    ):(
                                    <RemoveFavorite removeFromFavText='' iclassname='allprod-addfav-true atcrecom-addfav-true' removedFromFavorites={el}/>
                                  )} 
                                </span>
                          <div className="allprod-imgehead-wrp">
                            <Link to={`/viewproduct/${el.id}`}>
                              <img className='allprod-img-head' src={`images/${el.img}`} alt=''/>
                            </Link>
                          </div>
                          <div className='allprod-prodthub-caption'>
                              {/* <span className='allprod-cap-brandname'><span>{el.brand}</span><span>{el.color}</span></span> */}
                              <span className='allprod-cap-prodtitle'>{el.title}</span>
                              <span className="allprod-cap-rating-wrapper">
                                <ReactStars
                                  value={Number(el.rating)}
                                  edit={false}
                                  count={5}
                                  activeColor="#ffd700"
                                  />
                                  <p>2.5</p>
                                  <p>(3)</p>
                              </span>
                              <span className='allprod-cap-prodprice'>{el.price} lei</span>
                              <div className='allprod-cap-prodactions'>
                                  
                                {/* Addedproduct - for cart / setCurrentAddedToCart - for AddedToCartDisplay */}
                                <AddToCartBtn addedProduct={el} onClick={() => setCurrentAddedToCart(el)} className='allprod-addtocart-btn' text='Adauga in cos'/>
                                
                                <AddToCartBtn addedProduct={el} onClick={() => setCurrentAddedToCart(el)} text=''/>

                              </div>
                          </div>
                        </div>
                    </div>
          )}
        </>
        ) : (
              <div className='allprod-empty-cont'>Nu s-a gasit nimic</div>
        )}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
    const { pureProductsList, setPureProductsList } = useContext(MainContext);

  
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = Math.min(itemOffset + itemsPerPage, pureProductsList.length);
  const currentItems = pureProductsList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pureProductsList.length / itemsPerPage);

  // Invoke when user click to request another page.
// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = event.selected * itemsPerPage;
  setItemOffset(newOffset);
};


  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Pagina urmatoare"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="Pagina anterioara"
        renderOnZeroPageCount={null}
        className='pagination-products'
        />
    </>
  );
}
 
export default PaginatedItems;