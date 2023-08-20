import React, {useContext} from "react";
import { useEffect, useState } from "react";
import { MainContext} from "../../MainHome";
import {Link }     from 'react-router-dom'; 
import {FavoriteBorderIcon} from '../includes/materialui-import';
import ReactStars from "react-rating-stars-component";
import AddToFavorites from '../modules/addtofavbtn';
import RemoveFavorite from '../modules/removefavorite';
import products from "../../assets/js/products";


function AddedToCartDisplay(props) {
  const { cartContext, setCartContext } = useContext(MainContext);
  const [ recProducts, setRecProducts ] = useState([]);
  const { productsContext, setProductsContext } = useContext(MainContext);
  const { selectedProduct, setSelectedProduct } = useContext(MainContext);
  const addedProduct = props.addedToCartProduct;
  const { displayAddedToCartMsg, setDisplayAddedToCartMsg } = useContext(MainContext);
 

  useEffect(() => {
    // Listen for ESC keypress
    document.querySelector('body').addEventListener('keydown', handleKeyDown, true)
    getRecommendedProducts();
    return () => {
        document.querySelector('body').removeEventListener('keydown', handleKeyDown, true);
    }
},[])

const handleKeyDown = (e) => {
    if(e.key == 'Escape' || e.keyCode == 27) {
        displayProductModalClick();
    }
}
const displayProductModalClick = () => {
    setDisplayAddedToCartMsg(false);
}

const getRecommendedProducts = () => {
    // let randomIds = [];
    // let randomRecommProducts = [];

    // // Loop throug productsContext length and get 4 random ids to and display them as recomanded products
    // for (let i = 0; i < productsContext.length; i++) {
    //     let randomId;
    //     let randomNumber = Math.floor(Math.random() * productsContext.length) + 1;
    //     if (randomIds.length === 0) {
    //       randomIds.push(randomNumber);
    //     } else {
    //       if (randomIds.length <= 4 && !randomIds.includes(randomNumber)) {
    //         randomIds.push(randomNumber);
    //       }
    //     }
    //   }
      

    //   for (let i = 0; i < randomIds.length; i++) {
    //     if (randomIds.includes(Number(productsContext[i].id))) {
    //       randomRecommProducts.push(productsContext[i]);
    //     }
    //   }
      

    //     // Fisher-Yates (aka Knuth) shuffle
    //     for (let i = randomRecommProducts.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [randomRecommProducts[i], randomRecommProducts[j]] = [randomRecommProducts[j], randomRecommProducts[i]];
    //       }
    //     setRecProducts(randomRecommProducts);
    let randomIds = [];
    let randomRecommProducts = [];

    // Loop through productsContext length and get 5 random ids to display them as recommended products
    while (randomIds.length <= 5) {
    let randomNumber = Math.floor(Math.random() * productsContext.length) + 1;
    if (!randomIds.includes(randomNumber)) {
        randomIds.push(randomNumber);
    }
    }

    for (let i = 0; i < productsContext.length; i++) {
    if (randomIds.includes(Number(productsContext[i].id))) {
        randomRecommProducts.push(productsContext[i]);
    }
    }

    // Fisher-Yates (aka Knuth) shuffle
    for (let i = randomRecommProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomRecommProducts[i], randomRecommProducts[j]] = [randomRecommProducts[j], randomRecommProducts[i]];
    }

    console.log(randomRecommProducts);
    if (randomRecommProducts.length > 4) {
        randomRecommProducts = randomRecommProducts.slice(0, 4);
      }
      
      setRecProducts(randomRecommProducts);
      

    }

    const viewRecomProduct = (item) => {
        setDisplayAddedToCartMsg(false);
        setSelectedProduct(item);
        window.scrollTo(0,0);
    }

 
  return (
    <div className="addedtocart-display-product-modal" onClick={displayProductModalClick}>
        <div className="addedtocartdisplay-prod-content" onClick={(e) => e.stopPropagation()}>
            <div className="addeddisplayproduct-showprod-title">
                <h5>Produsul a fost adaugat in cos</h5>
                <i className="fa-solid fa-xmark" onClick={() => setDisplayAddedToCartMsg(false)}></i>
            </div>
            <div className="addedtocartdisplay-prod-cont-wrp">

                <div className="addeddisplayproduct-showproduct">
                    <img src='../images/acer.png' alt=''/>
                    <div className="addeddisplayproduct-showcontent">
                        <p>{addedProduct.title}</p>
                        <div>
                            <span className="adddprod-showc-price">{addedProduct.price} lei</span>
                            <Link to={'/cart'}
                                    aria-label='cart' 
                                    className='btn-def btn-def-sm' 
                                    tabIndex='0'
                                    onClick={() => setDisplayAddedToCartMsg(false)}>Vezi detalii cos</Link>
                        </div>
                    </div>
                </div>

                <div className="addedtocartdisplay-prod-contrwp-recom">
                    <div className="atc-recom-cont">

                        {recProducts.length && recProducts.map((item,index) => 
                            <div className="atc-recom-item" key={item.id}>
                            {item.oldPrice > 0 ? ( <span className="allprod-badge-offer">Super pret</span> ) : ("")}

                                <div className="allprod-thumb-fav">
                                {!item.addedToFav ? (
                                  <AddToFavorites 
                                  id='atc-recom-id-false' 
                                  iclassname='allprod-addfav-false' 
                                  addToFavTxt='' 
                                  addedProductToFav={item}/>
                                  ):(
                                  <RemoveFavorite
                                  removeFromFavText='' 
                                  id='atc-recom-id-true' 
                                  iclassname='allprod-addfav-true' 
                                  removedFromFavorites={item}/>
                                )} 
                                </div>
                                <Link to={`/viewproduct/${item.id}`} onClick={() => viewRecomProduct(item)} className="displayaddedtocart-img-recom">
                                <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${item.id}/1.jpg`} alt={item.title}/>
                                </Link>
                                <div className="atc-recom-box-title-wrap">
                                    <Link to={`/viewproduct/${item.id}`} className="atc-recom-box-title" onClick={() => viewRecomProduct(item)}>{item.title}</Link>
                                </div>
                                <Link to={`/viewproduct/${item.id}`} onClick={() => viewRecomProduct(item)} className="atc-recombox-rating">
                                    {item.rating && (
                                        <ReactStars
                                        value={item.rating}
                                        edit={false}
                                        count={5}
                                        size={20}
                                        activeColor="#ffd700"
                                        />
                                        )}
                                        <span className="atc-recom-ratno">
                                        {item.ratingValue !== null && (
                                            <div>
                                            <span>{item.rating}</span>
                                            </div>
                                        )}
                                        </span>
                                    </Link>
                                <div className="atc-recom-box-price">
                                    <span>{item.price}lei {item.oldPrice > 0 ? <span className="atcrecombox-price-offer">{item.oldPrice} lei</span> : ""}</span>
                                    <Link to={`/viewproduct/${item.id}`} onClick={() => viewRecomProduct(item)}>Detalii</Link>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddedToCartDisplay;
