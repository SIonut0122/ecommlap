import React, {useContext, useEffect} from "react";
import { MainContext} from "../../MainHome";
import DisplayAddedToMsg from "./addedToMsg";


function RemoveFavorite(props) {
    const { favoritesContext, setFavoritesContext } = useContext(MainContext);
    const { productsContext, setProductsContext } = useContext(MainContext);

  const removeProductFromFav = (e = props.removedFromFavorites) => {
    setFavoritesContext(oldFav => oldFav.filter(fav => fav.id !== e.id));

    // Update wishlisted items on cart products
    let removeWishlistFromProducts = [...productsContext];
    removeWishlistFromProducts.map(el => {
      if(el.id == e.id) {
        el.addedToFav = false;
      }
    })
    setProductsContext(removeWishlistFromProducts);

      // Remove removed product and update cart item on localstorage
     // Setting up localStorage here - using useEffect cause localStorage item to be deleted
      // (the cause may be the multiple times rendering ( x Product item ))
      localStorage.setItem('favorites', JSON.stringify(favoritesContext.filter(fav => fav.id !== e.id)));

      
      // Display 'Removed from fav' message
      const url = window.location.href;
      const pathSegments = url.split('/');
      const lastPathSegment = pathSegments[pathSegments.length - 1];

      // Don't display 'Removed from fav' on 'favorites' page
      if(lastPathSegment !== 'favorites') {
        const details = {'iclassname': 'fa-regular', 'iclassnameSecond': 'fa-heart', 'text':'Produsul a fost eliminat de la favorite!'}
        DisplayAddedToMsg(details);
      }
    }

 

  return (
    <span   className="removefav-def-btn"
            onClick={() => removeProductFromFav()}>
            <i className={props.iclassname} id={props.id}></i> 
            {props.removeFromFavText}
            
    </span>

    
  );
}

export default RemoveFavorite;
