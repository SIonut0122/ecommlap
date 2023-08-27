import React, {useEffect, useState, useContext} from "react";
import { useParams }     from 'react-router-dom'; 
import { MainContext} from "../MainHome";
import products from '../assets/js/products';
import AddToCartBtn from './modules/addtocartbtn';
import ProductInfoBottom from './reusable/product-info-description';
import ReactStars from "react-rating-stars-component";
import RemoveCartProduct from './modules/removecartproduct';
import AddToFavorites from './modules/addtofavbtn';
import RemoveFavorite from './modules/removefavorite';
import AddedToCartDisplay from './modules/addedtocartdisplay';
import Button from '@mui/material/Button';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {Link }     from 'react-router-dom'; 
 




function ViewProductInfo( ) {
  const { count, setCount } = useContext(MainContext);
  let { id } = useParams();
  const { selectedProduct, setSelectedProduct } = useContext(MainContext);
  const [ratingValue, setRatingValue] = useState();
  const [showAlertMsg, setShowAlertMsg] = useState(false);
  const [isPriceAlert, setIsPriceAlert] = useState(false);
  const { cartContext, setCartContext } = useContext(MainContext);
  const { displayAddedToCartMsg, setDisplayAddedToCartMsg } = useContext(MainContext);
  const [selProductUpdated, setSelProductUpdated] = useState(false);


  useEffect(() => {

    let filterProduct = products.filter(el => el.id == id);
    setSelectedProduct(filterProduct[0]);

    checkItemAlertPrice();
    return () => {
      // Unmount 'Added to cart  modal message'
      setDisplayAddedToCartMsg(false);
    }
  }, [])

  useEffect(() => {
    if(selectedProduct) {
      setSelProductUpdated(true);
    }
  }, [selectedProduct])

  const checkItemAlertPrice = () => {
    if(localStorage.getItem('priceAlertList') !== null && localStorage.getItem('priceAlertList').length > 0) {
      let alertProducts = [...JSON.parse(localStorage.getItem('priceAlertList'))];
       
      if(alertProducts.includes(id)) {
       setIsPriceAlert(true);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setRatingValue(selectedProduct.rating);
    },1000);

    // Set window title
    document.title = selectedProduct.title;
  },[selectedProduct]);

  useEffect(() => {
    console.log('Added to cart from product info');
  },[cartContext])

  const priceAlert = () => {
    // Get the existing alertProducts list from localStorage
    let alertProducts = JSON.parse(localStorage.getItem('priceAlertList')) || [];
  
    // Check if the selectedProduct.id exists in the alertProducts list
    if (alertProducts.includes(selectedProduct.id)) {
      // If it exists, remove it from the list
      let newAlertList = alertProducts.filter((productId) => productId !== selectedProduct.id);
      localStorage.setItem('priceAlertList', JSON.stringify(newAlertList));
      setIsPriceAlert(false);
    } else {
      // If it doesn't exist, add it to the list
      let newAlertList = [...alertProducts, selectedProduct.id];
      localStorage.setItem('priceAlertList', JSON.stringify(newAlertList));
      setIsPriceAlert(true);
      setShowAlertMsg(true);

      setTimeout(() => {
        setShowAlertMsg(false);
      },4000);
    }
  };
  

let discountPercentage = () => {
  const oldPrice = selectedProduct.oldPrice;
  const newPrice = selectedProduct.price;
  const discountPercentage = ((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100;
  return '-'+discountPercentage.toFixed(2)+'%';

}

  return (
    <div className="productinfo-cont-wrp">
                <div className='productinfo-container container'>
          <div className='productinfo-wrp-prodhref'>
            <span><Link to={'/products'}>Produse</Link> / Laptopuri / <Link to={`/viewproduct/${selectedProduct.id}`}>{selectedProduct.title}</Link></span>
            <p>Cod produs: {selectedProduct.modelNo}</p>
          </div>
          <div className='productinfo-wrp-prodtitle'><h4>{selectedProduct.title}, {selectedProduct.brand}, {selectedProduct.modelNo}</h4></div>

          <div className='productinfo-wrapper'>
            <section className='prodinfo-wrp-col-one'>
            <span className="allprod-badge-offer">Super pret</span>
            <Carousel showArrows={false} emulateTouch={true} showIndicators={false} showStatus={false}>
                  <div>
                  <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${selectedProduct.id}/1.jpg`} alt={selectedProduct.title}/>
                  </div>
                  <div>
                  <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${selectedProduct.id}/2.jpg`} alt={selectedProduct.title}/>
                  </div>
                  <div>
                  <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${selectedProduct.id}/3.jpg`} alt={selectedProduct.title}/>
                  </div>
                  <div>
                  <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${selectedProduct.id}/4.jpg`} alt={selectedProduct.title}/>
                  </div>
              </Carousel>
            </section>
            <section className='prodinfo-wrp-col-two'>
            {showAlertMsg && 
              <div className="prodinfo-alert-price-added">Alerta de pret a fost setata</div>
            }

              {/* Price */}
              <div className='prodinfo-wcoltwo-price'>
                  <div className='prodinfo-wcoltwoprice-wrpprice'>
                    <div>
                      <p>{selectedProduct.oldPrice && selectedProduct.oldPrice}</p>
                      {selectedProduct.oldPrice && (
                        <span>
                          {discountPercentage()}
                        </span>
                      )}
                    </div>
                    <h4>{selectedProduct.price}<span>lei</span></h4>
                  </div>
                  <div className='prodinfo-wcoltwoprice-wrppricealert'>
                    <Button disableRipple 
                            startIcon={!isPriceAlert ? <NotificationsNoneOutlinedIcon /> : <NotificationsActiveIcon />}
                            onClick={priceAlert}>
                            Alertă preț
                     </Button>
                  </div>
              </div>

              {/* Rating */}
              <div className="prodinfo-rating-wrapper">
                <div>
                  {ratingValue && (
                    <ReactStars
                    value={ratingValue}
                    edit={false}
                    count={5}
                    size={25}
                    activeColor="#ffd700"
                    />
                    )}
                    <span className="prodinfo-rating-value-no">
                      {ratingValue !== null && (
                        <div>
                        <span>{ratingValue}</span>
                        <a href="#">(10 review-uri)</a>
                        </div>
                      )}
                    </span>
                </div>

                  <span className='prodinfo-availability-txt'>
                    <i className='bi bi-patch-check-fill'></i>
                    În stoc
                    </span>
              </div>

              <div className="prodinfo-color-wrapper">
                     <span>Culoare:</span>
                     <span>{selectedProduct.color}</span>
                    
              </div>
           
              {/* More info */}
              <div className='prodinfo-wrpcoltwo-moreinfo'>
                <span className="prodinfo-wrpcoltwo-moreinfo-delivery">
                  <span>
                   <i className="bi bi-truck"></i>
                   Livrare și retur gratuite de la 6000 lei
                  </span>
                </span>
              </div>

              <div className='prodinfo-wrpcoltwo-moreinfo'>
                <span className="prodinfo-wrpcoltwo-moreinfo-delivery prodinfo-wrpmoreinfo-retur">
                  <span>
                   <i className="bi bi-clock-history"></i>
                    30 de zile pentru retur 
                  </span>
                </span>
              </div>

              <div className='prodinfo-wrpcoltwo-moreinfo'>
                <span className="prodinfo-wrpcoltwo-moreinfo-delivery prodinfo-wrpmoreinfo-discount">
                  <span>
                  <i className="bi bi-piggy-bank"></i>
                    La peste 3000lei ai -5% discount
                  </span>
                </span>
              </div>

              {/* Buttons */}
              <div className='prodinfo-wrpcoltwo-action'>

           
                  <AddToCartBtn addedProduct={selectedProduct} text='Adauga in cos'/>

                 <div className='prodinfo-wpcoltwo-action-addremovefavbtn'>
                  {!selectedProduct.addedToFav ? (
                      <AddToFavorites iclassname='bi bi-heart' addToFavTxt='Adauga la Favorite' addedProductToFav={selectedProduct}/>
                      ):(
                      <RemoveFavorite removeFromFavText='Elimina' iclassname='bi bi-heart-fill' removedFromFavorites={selectedProduct}/>
                    )} 
                  </div>
              </div>

            </section>
          </div>
            {displayAddedToCartMsg && (
              <AddedToCartDisplay addedToCartProduct={selectedProduct}/>
            )}
            
        </div>
            <div className="container-fluid">
              {selProductUpdated && (
                <ProductInfoBottom productInfo={selectedProduct}/>
              )}
            </div>
    </div>  
  );
}

export default ViewProductInfo;
