import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";
import {Link }     from 'react-router-dom'; 


function Contact( ) {
  
  useEffect(() => {
  // Set title
  document.title = 'Contacteaza-ne';
  },[])

  const submitContactForm = (e) => {
    // prevent submit
    e.preventDefault();
    
    // reset form and display success msg
    e.target.reset();
    let successMsg = document.getElementById('contact-msg-success');

    successMsg.classList.remove('d-none');
    successMsg.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
  } 
  
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

                <form method="POST" className="contact-cwrp-mid" onSubmit={(e) => submitContactForm(e)}>
                  <div className="mb-3">
                    <label htmlFor="contact-name" className="form-label">Nume si prenume *</label>
                    <input type="text" className="form-control" id="contact-name" placeholder=""/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-phone" className="form-label">Telefon</label>
                    <input type="text" className="form-control" id="contact-phone" placeholder=""/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-email" className="form-label">Email *</label>
                    <input type="text" className="form-control" id="contact-email" placeholder=""/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Mesaj *</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div className="contact-mid-wrpbtn">
                    <button className="btn" type="submit">Trimite</button>
                  </div>

                  <p id="contact-msg-success" className="d-none">Mesajul a fost trimis! Multumim!</p>
                </form>

                <div className="contact-cwrp-right">
                 <div className="contact-cwrpright-box">
                  <p className="contact-cright-title">Call center</p>
                  <p className="contact-cright-notitle">021 7686</p>
                  <p className="contact-cright-smtitle">Disponibil in toate retelele (tarif normal)</p>
                 </div>

                 <div className="contact-cwrpright-box">
                  <p className="contact-cright-notitle">021 639 8285</p>
                  <p className="contact-cright-smtitle">Apelabil din orice retea, din tara si din strainatate (tarif normal)</p>
                 </div>

                 <div className="contact-cwrpright-box">
                  <p className="contact-cright-title">Program call center</p>
                  <p className="contact-cright-smtitle">Luni - Vineri: 08:00 – 21:00</p>
                  <p className="contact-cright-smtitle">Sambata: 08:00 – 17:00</p>
                  <p className="contact-cright-smtitle">Duminica: Indisponibil</p>
                 </div>

                 <div className="contact-cwrpright-box">
                  <p className="contact-cright-title">Sediu central</p>
                  <p className="contact-cright-smtitle">Soseaua Bucuresti-Nord, Nr. 10, Corp O1, Voluntari, Judetul Ilfov</p>
                 </div>

                </div>
            </div>
          </div>
        </div>
  );
}

export default Contact;
