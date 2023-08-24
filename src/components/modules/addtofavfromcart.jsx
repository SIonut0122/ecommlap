import React, {useContext, useEffect} from "react";
import { MainContext} from "../../MainHome";
 import DisplayAddedToMsg from "./addedToMsg";
 import Button from '@mui/material/Button';
 import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


function AddToFavFromCart(props) {
    const { favoritesContext, setFavoritesContext } = useContext(MainContext);
    const { cartContext, setCartContext } = useContext(MainContext);


   const addToFavFromCart = (fav = props.addedProductToFav) => {
        // Use received prduct props
    const addToFavorites = (fav = props.addedProductToFav) => {
        let prodFound = false;
       
        // Search for the product ID and set to true if already exist
        for(let i=0; i < favoritesContext.length; i++) {
         if(favoritesContext[i].id === fav.id) {
           prodFound = true;
           break;
         }
        }
 
        // If product was not found, add it to the cart
         if(!prodFound) {
          fav.addedToFav = true;
            setFavoritesContext(oldFav => [...oldFav, fav]);

            // Display 'Added to fav' message
            const details = {'product': fav, 'iclassname': 'fa-solid', 'iclassnameSecond': 'fa-heart', 'text':'Produsul a fost adaugat la favorite!'}
            DisplayAddedToMsg(details);

         } 
    }

    const removeFromCart = (removed = props.removedCartProduct) => {
        setCartContext(oldCart => oldCart.filter(el => el.id !== removed.id));
        let newCart = cartContext.filter(el => el.id !== removed.id);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }



       addToFavorites();
       removeFromCart();

   }

   useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesContext));
   },[favoritesContext]);


  return (
  <Button onClick={() => addToFavFromCart()} variant="outlined" startIcon={<FavoriteBorderOutlinedIcon />}>
    Muta la favorite
  </Button>
  );
}

export default AddToFavFromCart;
