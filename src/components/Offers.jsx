import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";
import { useNavigate }   from 'react-router-dom'; 

function Offers( ) {
    const { displayOffers, setDisplayOffers } = useContext(MainContext);
    const navigate = useNavigate();


    useEffect(() => {
      // set display offers to true and redirect to the products
      setDisplayOffers(true);
        navigate('/products'); 
    })
  
  return (
        <div className='offers-container'>
        </div>
  );
}

export default Offers;
