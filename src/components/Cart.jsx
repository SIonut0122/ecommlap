import React, {useEffect, useState, useContext} from "react";
import { useParams, Link, useNavigate }   from 'react-router-dom'; 
import { MainContext} from "../MainHome";
import products from '../assets/js/products';
import RemoveCartProduct from './modules/removecartproduct';
import AddToFavorites from './modules/addtofavbtn';
import AddToFavFromCart from './modules/addtofavfromcart';
import {IconButton, AddIcon, RemoveIcon, TextField, Button, ShoppingCartCheckoutIcon, ShoppingCartIcon} from './includes/materialui-import';



function Cart( ) {
  const { cartContext, setCartContext } = useContext(MainContext);
  const { cartTotalContext, setCartTotalContext } = useContext(MainContext);
  const { proceedToCheckout, setProceedToCheckout } = useContext(MainContext);
  const navigate = useNavigate();


  const calculateTotalAmount = () => {
    if(cartContext.length > 0) {
    const getAllPrices = cartContext.map(el => el.totalAmount ? el.totalAmount : el.price);
    const totalCartAmount = getAllPrices.reduce((a,b) => a + b,0);
    
    setCartTotalContext(totalCartAmount);
    }
  }
 
  useEffect(() => {
    // Calculate cart price on mount
   calculateTotalAmount();
   document.title = "Cosul tau"; 
   // Reset checkout value
   setProceedToCheckout(false);

  // Set title
  document.title = 'Cosul meu';

 
  }, [])


  useEffect(() => {
    calculateTotalAmount();
  }, [cartContext])

  const selectProductQuantity = (item, type) => {
    let cart = [...cartContext];
    let quantity = item.quantity;


    if(type === 'increase') {
      quantity = quantity + 1;
    } else {
      if(quantity !== 1) {
        quantity = quantity - 1;
      }
    }
   
    // Update totalAmount and quantity
    cart.forEach(el => {
      if(el.id === item.id) {
        el.quantity = quantity;
        el.totalAmount = el.price * Number(quantity);
      }
    })

    setCartContext(cart);
     // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const proceedToCheckoutFn = (e) => {
    // Display loadin btn and set proceedtocheckout to true to display checkout page
    e.target.classList.add('dloading-btn');
    setProceedToCheckout(true);

    setTimeout(() => {
      navigate('/checkout');
    }, 1500);
  }
  
  const displayTotalCartContext = () => {
    if(cartTotalContext > 3000) {
      return cartTotalContext;
    } else {
      return cartTotalContext + 19.99;
    }
  }
  
  return (
        <div className='cart-container container'>
            <div id="addedto-alertview"></div>
              <h4>Cosul meu</h4>  
              
              {cartContext.length > 0 ? (
                <div className="cart-wrap-products">
                      <div className="cart-wrapper">
                        <div className="cart-wrapper-top">
                          <div className="cart-wrp-top-list">
                            {cartContext.map(product =>
                                  <div className='cart-item' key={product.id}>
                                  <div className="cart-item-img-wrp">
                                    <Link to={`/viewproduct/${product.id}`}>
                                      <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${product.id}/1.jpg`} alt='' className='img-fluid'/>
                                    </Link>
                                  </div>
                                  <div className='cart-item-info'>
                                    <div className='cartitem-info-main'>
                                      <Link to={`/viewproduct/${product.id}`} title=''>{product.title}, {product.brand}, {product.modelNo}</Link>
                                      <span className='cartitem-info-main-price'>{product.totalAmount ? product.totalAmount : product.price} <span>lei</span></span>
                                    </div>
                                    <div className='cartitem-info-sec'>
                                      <div>
                                        <p>Disponibilitate: In stoc</p>
                                        <p>Garantie inclusa: 2 ani</p>
                                      </div>
                                      <div className='cartitem-info-wrappiece'>
                                      <IconButton size="small" onClick={(e) => selectProductQuantity(product,'decrease')}>
                                          <RemoveIcon fontSize="inherit"/>
                                        </IconButton>
                                        <span className='cartitem-quantity-value'>{product.quantity}</span>
                                        <IconButton size="small" onClick={(e) => selectProductQuantity(product,'increase')}>
                                          <AddIcon fontSize="inherit"/>
                                        </IconButton>
                           
                                      </div>
                                    </div>
                                    <div className='cartitem-info-last'>
                                      <AddToFavFromCart addedProductToFav={product} removedCartProduct={product}/>
                                      <RemoveCartProduct removedCartProduct={product}/>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>

                          <div className='cart-wrap-checkout'>
                            <div className='cart-checkout'>
                                <h4>Sumar comanda:</h4>
                                <div className='cart-summary-row'>
                                  <div>Cost produse:</div>
                                  <div>{cartTotalContext}<span> lei</span></div>
                                </div>
                                <div className='cart-summary-row'>
                                  <div>Cost livrare:</div>
                                  <div>{cartTotalContext > 3000 ? (<>0 <span>lei</span></>) : (<>19.99<span> lei</span></>)}</div>
                                </div>
                                <div className='cart-summary-total'>
                                    <div>
                                      <span>Total:</span>
                                      <span>{displayTotalCartContext()} lei</span>
                                    </div>
                                </div>
                                <div className="cart-summ-checkout-wrp btn-org-btn">
                                    <button type="button" onClick={(e) => proceedToCheckoutFn(e)}>
                                      <ShoppingCartCheckoutIcon />
                                      <div className="spinner-border spinner-border-sm spinner-border-cart" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                      </div>
                                        Continua
                                    </button>
                                </div>
                            </div>
                            <div className="cart-wrapcheckout-voucher">
                            <p>Ai un voucher?</p>
                            <form action="POST">
                              <TextField id="outlined-basic" variant="outlined" />
                              <button type="button" className="lognewc-btn">Aplica</button>
                            </form>
                        </div>
                          </div>  
                        </div>



                      </div>
                </div>
                ) : (
                  <div className="empty-cart-wrapper">
                    <ShoppingCartIcon />
                    <p>Cosul tau este gol. Pentru a adauga produse, intoarce-te in <Link to={'/products'}>magazin</Link>.</p>
                  </div>
                )}
          
        </div>
  );
}

export default Cart;
