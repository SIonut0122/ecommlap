import React, {useContext, useState} from "react";
import appgallery from '../../assets/images/footer/appgallery.png';
import appstore from '../../assets/images/footer/appstore.png';
import googleplay from '../../assets/images/footer/googleplay.png';
import bba_romania_2023 from '../../assets/images/footer/bba_romania_2023.png';

function getCurrentYear() {
    const d = new Date();
    let year = d.getFullYear();
    return year;
}

function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <div className="container">
                <div className="footer-top-left">
                <img src={bba_romania_2023} alt=''/>
                    <p>Cel mai bun raport pret-calitate</p>
                </div>

                <div className="footer-top-apps">
                    <a target="_blank" href='https://www.apple.com/app-store/'><img src={appstore} alt='App store'/></a>
                    <a target="_blank" href="https://appgallery.huawei.com/"><img src={appgallery} alt='App gallery'/></a>
                    <a target="_blank" href='https://play.google.com/store/'><img src={googleplay} alt='Google play'/></a>
                </div>
                </div>
            </div>
            <div className="footer-bottom container">
                <div className="footer-bottom-column">
                    <p className="fbottom-col-title">
                    Despre
                    </p>
                    <a href='#'>Despre noi</a>
                    <a href='#'>Marketplace</a>
                    <a href='#'>Categorii produse</a>
                    <a href='#'>Protectia mediului</a>
                    <a href='#'>Vanzari corporate</a>
                    <a href='#'>Tax free</a>
                </div>
                <div className="footer-bottom-column">
                    <p className="fbottom-col-title">
                    Suport clienti
                    </p>
                    <a href='#'>Articole suport</a>
                    <a href='#'>Contact</a>
                    <a href='#'>Returneaza produse</a>
                    <a href='#'>Reclamatii</a>
                    <a href='#'>Vanzari</a>
                    <a href='#'>Reteaua de magazine</a>
                </div>
                <div className="footer-bottom-column">
                    <p className="fbottom-col-title">
                    Informatii legale
                    </p>
                    <a href='#'>Termeni si conditii</a>
                    <a href='#'>Politica cookie-uri</a>
                    <a href='#'>Informatii privind DEEE</a>
                    <a href='#'>A.N.P.C.</a>
                    <a href='#'>Protectia datelor cu caracter personal</a>
                    <a href='#'>ODR</a>
                </div>
                <div className="footer-bottom-column">
                    <p className="fbottom-col-title">
                    Contact
                    </p>
                    <a href="tel:0219196">Telefon: 021 / 9196</a>
                    <a href="tel:0213199939">Fax: 021 / 319.99.39</a>
                    <a href="/contact/">Formular de contact</a>
                </div>
                <div className="footer-bottom-column">
                    <p className="fbottom-col-title">
                        Urmareste-ne
                    </p>
                    <div className='footer-bottom-social'>
                    <a href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                    </a>
                    <a href='#'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                    </svg>
                    </a>
                    <a href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                    </a>
                    <a href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                        </svg>
                    </a>
                    </div>
                     
                </div>
               
            </div>
            <div className='footer-bottom-copyrights container'><span>{getCurrentYear()}</span> @ eCommerce</div>
        </footer>
    )
    }

export default Footer