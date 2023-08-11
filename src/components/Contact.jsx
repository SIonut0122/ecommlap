import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";

function Contact( ) {
  
  useEffect(() => {
  // Set title
  document.title = 'Contacteaza-ne';
  },[])
  
  return (
        <div className='contact-container'>
          <div className="container">
            <h4 className="h4title">Contact</h4>
          </div>
        </div>
  );
}

export default Contact;
