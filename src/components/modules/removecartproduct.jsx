import React, {useContext, useEffect} from "react";
import { MainContext} from "../../MainHome";
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


function RemoveCartProduct(props) {
  const { cartContext, setCartContext } = useContext(MainContext);

  const removeProductFromCart = (e = props.removedCartProduct) => {

     setCartContext(oldCart => oldCart.filter(el => el.id !== e.id));
          
     // Remove removed product and update cart item on localstorage
     // Setting up localStorage here - using useEffect cause localStorage item to be deleted
      // (the cause may be the multiple times rendering ( x Product item ))
      localStorage.setItem('cart', JSON.stringify(cartContext.filter(el => el.id !== e.id)));

   }

  return (
  <Button onClick={() => removeProductFromCart()} variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}>
    Elimina
  </Button>
  );
}

export default RemoveCartProduct;
