import React, {useContext} from "react";
import { useEffect } from "react";
import { MainContext} from "../../MainHome";
import DisplayAddedToMsg from "./addedToMsg";
import { Button , DeleteIcon, AddShoppingCartIcon } from '../includes/materialui-import';



function AddToCartBtn(props) {
  const { cartContext, setCartContext } = useContext(MainContext);
  const { displayAddedToCartMsg, setDisplayAddedToCartMsg } = useContext(MainContext);
  const { currentAddedToCart, setCurrentAddedToCart } = useContext(MainContext);

    // Use received prduct props
  const addToCart = (e = props.addedProduct) => {
    let prodFound = false;
    let product = e;

    // Search for the product ID and set to true if already exist
    for(let i=0; i < cartContext.length; i++) {
     if(cartContext[i].id === product.id) {
       prodFound = true;
       break;
     }
    }

    // If product was not found, add it to the cart
    let cart = [...cartContext];
     if(!prodFound) {
      product['quantity'] = 1;
      cart.push(product);
      setCartContext(cart);
      setCurrentAddedToCart(product);
      
     // Setting up localStorage here - using useEffect cause localStorage item to be deleted
      // (the cause may be the multiple times rendering ( x Product item ))
      localStorage.setItem('cart', JSON.stringify(cart));
      

     } else {
       console.log('prod was found');

       // Increase quantity and totalAmount of product if found
       let newProdQuant = product.quantity = product.quantity + 1;
       let newProdAmount = product.totalAmount = product.quantity * product.price;

       const productIndex = cart.findIndex(p => p.id === product.id);
       const updatedProduct = { ...cart[productIndex], quantity: newProdQuant , totalAmount: newProdAmount };
       const updatedProducts = [...cart.slice(0, productIndex), updatedProduct, ...cart.slice(productIndex + 1)];
      
       // Update localStorage
       localStorage.setItem('cart', JSON.stringify(cart));
     }

     // Display modal
     setDisplayAddedToCartMsg(true);

     (function addedToCartMsg() {
      const pathArray = window.location.pathname.split('/');
      const lastSegment = pathArray.pop();
      
      if(lastSegment === 'favorites') {
        const details = {'product': e, 'iclassname': 'fa-solid', 'iclassnameSecond': 'fa-basket-shopping', 'text':'Produsul a fost adaugat in cos!'}
        DisplayAddedToMsg(details);
      }
    })();
 

    }


   

  return (
    <button type='submit' 
            className='addtocart-def-btn'
            onClick={() => addToCart()}>
            <i className="bi bi-cart3"></i> 
            {props.text}
    </button>

  );
}

export default AddToCartBtn;
