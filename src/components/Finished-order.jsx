import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";
import {Link }     from 'react-router-dom'; 

function FinishedOrder( ) {
    const { proceedToCheckout, setProceedToCheckout } = useContext(MainContext);
    const { successOrder, setSuccessOrder } = useContext(MainContext);

    useEffect(() => {
        if(!successOrder) {
            window.location.replace('/cart');
        } 
       document.title = "Comanda finalizata"; 
       // Reset checkout value
       setProceedToCheckout(false);
      }, [])
  
      
  return (
        <div className='finished-order-container'>
            {!successOrder ? (
                <div className="page-loading-cont">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> 
                </div> 
            ):
            (
                <div className="container">
                    <h2>Multumim! Comanda a fost procesata cu succes!</h2>
                    <p>Detaliile comenzii au fost furnizate la adresa indicata. Poti sa urmaresti starea comenzii de pe pagina <a href="/contul-meu">contul meu</a></p>

                    <div className="cart-summ-checkout-wrp btn-org-btn">
                        <Link to={'/'}>
                        <button type="button">
                            Inapoi pe prima pagina
                        </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
  );
}

export default FinishedOrder;
