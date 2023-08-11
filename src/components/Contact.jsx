import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";
import {Link }     from 'react-router-dom'; 


function Contact( ) {
  
  useEffect(() => {
  // Set title
  document.title = 'Contacteaza-ne';
  },[])
  
  return (
        <div className='contact-container'>
          <div className="container">
            <h4 className="h4title">Contact</h4>

            <div className="contact-container-wrapper">
                <div className="contact-cwrp-left">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Servicii
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                      <ul>
                        <li><Link to={'#'}>Return online in 14 zile</Link></li>
                        <li><Link to={'#'}>Return in magazine</Link></li>
                        <li><Link to={'#'}>Garantia produselor</Link></li>
                        <li><Link to={'#'}>Extragarantie</Link></li>
                        <li><Link to={'#'}>Servicii de instalare</Link></li>
                      </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Cont client
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                      <ul>
                        <li><Link to={'/login'}>Creare cont</Link></li>
                        <li><Link to={'/login'}>Resetare parola</Link></li>
                      </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Contacteaza-ne
                      </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                      <ul>
                        <li className="contact-acc-disablelink"><Link to={'#'}>Date si formular de contact</Link></li>
                        <li><Link to={'#'}>Returneaza produse</Link></li>
            
                      </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Informatii generale
                      </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                      <ul>
                        <li><Link to={'#'}>Termeni si conditii</Link></li>
                        <li><Link to={'#'}>Protectia datelor cu caracter personal</Link></li>
                        <li><Link to={'#'}>Politica cookie-uri</Link></li>
                      </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div className="contact-cwrp-mid">
                  <div class="mb-3">
                    <label for="contact-name" class="form-label">Nume si prenume *</label>
                    <input type="text" class="form-control" id="contact-name" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <label for="contact-phone" class="form-label">Telefon</label>
                    <input type="text" class="form-control" id="contact-phone" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <label for="contact-email" class="form-label">Email *</label>
                    <input type="text" class="form-control" id="contact-email" placeholder=""/>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Mesaj *</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div className="contact-mid-wrpbtn">
                    <button class="btn" type="submit">Trimite</button>
                  </div>
                </div>

                <div className="contact-cwrp-right"></div>
            </div>
          </div>
        </div>
  );
}

export default Contact;
