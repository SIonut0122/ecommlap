import React, {useContext, useEffect} from "react";
import { MainContext} from "../../MainHome";
import Button from '@mui/material/Button';
import DisplayAddedToMsg from "./addedToMsg";


function AddToFavorites(props) {
    const { favoritesContext, setFavoritesContext } = useContext(MainContext);
    const { recProductsContext, setRecProductsContext } = useContext(MainContext);


    // Use received prduct props
    const addToFavorites = (e = props.addedProductToFav) => {
    let prodFound = false;
   
    // Search for the product ID and set to true if already exist
    for(let i=0; i < favoritesContext.length; i++) {
     if(favoritesContext[i].id === e.id) {
       prodFound = true;
       break;
     }
    }
    // If product was not found, add it to fav
     if(!prodFound) {
      let newFav = [...favoritesContext];
        newFav.push(e);
        setFavoritesContext(newFav);

        // Setting up localStorage here - using useEffect cause localStorage item to be deleted
          // (the cause may be the multiple times rendering ( x Product item ))
        localStorage.setItem('favorites', JSON.stringify(newFav));

        // Display 'Added to fav' message
        const details = {'iclassname': 'fa-solid', 'iclassnameSecond': 'fa-heart', 'text':'Produsul a fost adaugat la favorite!'}
        DisplayAddedToMsg(details);
        
        console.log('adeed to cart');

     } else {
       console.log('prod was found');
     }
   }

 

  return (
    <button type='submit' 
            className='caritem-addtofav'
            onClick={() => addToFavorites()}>
            <i className={props.iclassname} id={props.id}></i> 
            {props.addToFavTxt}
    </button>
    
  );
}

export default AddToFavorites;
