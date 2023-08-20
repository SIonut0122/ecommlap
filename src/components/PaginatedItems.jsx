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
  const { pureProductsList, setPureProductsList } = useContext(MainContext);


  let timeoutId;
  const handleMouseOver = (el) => {
    // get product id
    let elId = el.target.getAttribute('data-el-id');
    //on hover, after 3milisec change the product
    timeoutId = setTimeout(() => {
      let elImg = document.querySelector(`[data-el-id="${elId}"]`);
      if (elImg) {
        elImg.src = `https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${elId}/2.jpg`;
      }
    }, 300);
  }
  useEffect(() => {
    console.log('loaded');
  },[]);

  const handleMouseOut = () => { 
    clearTimeout(timeoutId);

    for(let i=0; i < pureProductsList.length; i++) {
      // get the product id
      let prodId = pureProductsList[i].id;
      // set default image by using the product id to target the folder images
      let elImg = document.querySelector(`[data-el-id="${prodId}"]`);
      if (elImg) {
        elImg.src = `https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${prodId}/1.jpg`;
      }
    }
  
  }

  return (
    <>
      {currentItems.length > 0 ? (
        <>
          {currentItems.map((el,ind) => 
              <div className='allprod-wrpdwrap-proditem allprod-wrpdwrap-proditem-grid'
              style={{opacity: !displayFilteredProducts ? '0.5': '1', pointerEvents: !displayFilteredProducts ? 'none': 'visible'}}
              key={el.id}
               >
                        <div className='allprod-product-thumb'>
                        {el.oldPrice > 0 ? ( <span className="allprod-badge-offer">Super pret</span> ) : ("")}
                        <span className="allprod-thumb-fav">
                                  {!el.addedToFav ? (
                                    <AddToFavorites iclassname='allprod-addfav-false atcrecom-addfav-false' addToFavTxt='' addedProductToFav={el}/>
                                    ):(
                                    <RemoveFavorite removeFromFavText='' iclassname='allprod-addfav-true atcrecom-addfav-true' removedFromFavorites={el}/>
                                  )} 
                                </span>
                          <div className="allprod-imgehead-wrp">
                            <Link to={`/viewproduct/${el.id}`}>
                              <img className='allprod-img-head' 
                              src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${el.id}/1.jpg`} alt=''
                              data-el-id={el.id}
                              onMouseOver={(e) => handleMouseOver(e)}
                              onMouseLeave={handleMouseOut}
                              />
                            </Link>
                          </div>
                          <div className='allprod-prodthub-caption'>
                              <span className='allprod-cap-prodtitle'>{el.title}</span>
                              <span className="allprod-cap-rating-wrapper">
                                <ReactStars
                                  value={Number(el.rating)}
                                  edit={false}
                                  count={5}
                                  activeColor="#ffd700"
                                  />
                                  <p>{el.rating}</p>
                                  <p>(3)</p>
                              </span>
                              <div className='allprod-cap-prodprice'>{el.price} lei {el.oldPrice > 0 ? <span>{el.oldPrice} lei</span> : ""}</div>
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