import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";

function Contact( ) {
  
  useEffect(() => {
  // Set title
  document.title = 'Contacteaza-ne';
  },[])
  
  return (
        <div className='contact-container'>
          Contact
        </div>
  );
}

export default Contact;
