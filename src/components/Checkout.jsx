import React, {useContext, useState,useEffect } from "react";
import { MainContext} from "../MainHome";
import { useNavigate }   from 'react-router-dom'; 
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './modules/loginButton';
import LogoutButton from "./modules/logoutButton";
import * as Yup from 'yup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Link }     from 'react-router-dom'; 
import {ShoppingCartCheckoutIcon, KeyboardDoubleArrowRightIcon} from './includes/materialui-import';
import { IsNumber } from "faunadb";
import { v4 as uuidv4 } from 'uuid';
import credit_cards from '../assets/images/credit_cards.svg';

 
const elasticMailUsername = import.meta.env.VITE_ELASTICMAIL_USERNAME; 
const elasticMailPassword = import.meta.env.VITE_ELASTICMAIL_PASSWORD; 
const myEmail = import.meta.env.VITE_MYEMAIL; 


function Checkout() {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('Livrare prin curier');
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [addressIsComplete, setAddressIsComplete] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberIsValid, setCardNumberIsValid] = useState(false);
    const [cvv, setCvv] = useState('');
    const [cvvIsValid, setCvvIsValid] = useState(false);
    const [expDateIsValid, setExpDateIsValid] = useState(false);
    const [expDate, setExpdate] = useState('');
    const { cartTotalContext, setCartTotalContext } = useContext(MainContext);
    const { proceedToCheckout, setProceedToCheckout } = useContext(MainContext);
    const { successOrder, setSuccessOrder } = useContext(MainContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ giveDiscount, setGiveDiscount ] = useState(false);
    const [ giveFreeShipping, setGiveFreeShipping ] = useState(false);
    const [ finalSum, setFinalSum ] = useState('0')
    
    useEffect(() => {
        if(!proceedToCheckout) {
            window.location.replace('/cart');
        } 
        document.title = "Detalii comanda"; 
        
        let discountedPrice = (5 / 100) * cartTotalContext;
        let totalAfterDiscount = parseFloat(cartTotalContext) - discountedPrice;

        // check discount & free shipping
        let sumCart = parseFloat(cartTotalContext); 
        if(sumCart > 6000) {
            setGiveDiscount(true);
            setGiveFreeShipping(true);
            setFinalSum(totalAfterDiscount);

        } else if(sumCart > 3000 && sumCart < 6000) {
            setGiveDiscount(true);
            setFinalSum(totalAfterDiscount + 19.99);
        } else if(sumCart < 3000 && sumCart < 6000) {
            setGiveDiscount(false);
            setGiveFreeShipping(false);
            setFinalSum(cartTotalContext + 19.99);
            
        }
    },[])

    

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };

    const checkDeliveryAddress = () => {
        const states = [name, lastName, phone, address, city, zip];

        const allValuesNotEmpty = states.every(value => value !== '');
  
        if (allValuesNotEmpty) {
            setAddressIsComplete(true);
        } else {
            setAddressIsComplete(false);
        }
    }

    const checkCvv = () => {
        if(!isNaN(cvv)) {
          setCvvIsValid(true);
        } else {
            setCvvIsValid(false);
        }
    }
 
    const formatCardNumber = () => {
        let checkCardNumberValue = cardNumber.split('');
        let convertToNumber = checkCardNumberValue.map(el => Number(el));
        let cardNoHasOnlyNumbers = checkCardNumberValue.every(el => !el == isNaN(el));
   
        if(cardNoHasOnlyNumbers) {
            let cardNumberFormat = cardNumber.replace(/\D/g, '');
            // Split the card number into groups of 4 digits
            var formattedNumber = cardNumberFormat.replace(/(\d{4})/g, '$1 ');
            // Remove any trailing space
            formattedNumber = formattedNumber.trim();
            setCardNumber(formattedNumber);
            setCardNumberIsValid(true);
        } else {
            setCardNumberIsValid(false);
        }
    }

    const formatExpdate = () => {
        // Remove any whitespace characters from the input value
        const formattedValue = expDate.replace(/\s/g, '');

        // Check if the input value matches the pattern
        if (isValidExpirationDate(formattedValue)) {
            const [month, year] = formattedValue.split('/');
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // getMonth() returns zero-based index

            if (parseInt(month) > 12) {
            setExpDateIsValid(false);
            } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) <= currentMonth)) {
            setExpDateIsValid(false);
            } else {
            setExpDateIsValid(true);
            }
        } else {
            setExpDateIsValid(false);
        }
    }
    
    const isValidExpirationDate = (value) => {
        // Define the regular expression patterns for the expiration date format
        const patternWithSpaces = /^\d{2}\s\/\s\d{4}$/;
        const patternWithoutSpaces = /^\d{2}\/\d{4}$/;
    
        // Check if the input value matches either pattern
        return patternWithSpaces.test(value) || patternWithoutSpaces.test(value);
    };

    const displayTotalAmount = () => {
        return cartTotalContext + 19.99;
    }
    const htmlTemplate = (tranzno) => {
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333333;
              }
        
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #dddddd;
                background-color: #f5f5f5;
              }
        
              h2 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333333;
              }
        
              p {
                margin-bottom: 10px;
              }
        
              .details {
                margin-top: 20px;
              }
        
              .details p {
                margin-bottom: 5px;
              }
        
              .details strong {
                font-weight: bold;
              }
              .details-order-view {
                margin-top:40px;
              }

            </style>
          </head>
          <body>
            <div class="container">
              <p style="margin-bottom:20px;font-weight:bold">EcommerceApp Tech</p>
              <h2>Iti multumim! Comanda a fost procesata cu succes.</h2>
              <p>Buna ziua, ${name} ${lastName}!</p>
              <p>Mai jos aveti detaliile comenzii:</p>
              <div class="details">
                <p><strong>Numar tranzactie:</strong> ${tranzno}</p>
                <p><strong>Adresa:</strong> ${address}</p>
                <p><strong>Numele:</strong> ${name} ${lastName}</p>
                <p><strong>Orasul:</strong> ${city}</p>
                <p><strong>Codul postal:</strong> ${zip}</p>
                <p class="details-order-view"><strong>Puteti sa urmariti detaliile comenzii din <a href="ecommerce-app/contul-meu">Contul meu.</a></strong></p>

              </div>
            </div>
          </body>
        </html>
        
        
        `
    }


    const submitForm = (e) => {
        e.preventDefault();
        let checkoutInputs = document.querySelectorAll('.chcktype-secaddress-wrp input');
        let checkoutButton = document.querySelector('.checkout-pay-btn');
        
        document.querySelectorAll('.chck-type-secpay-rowcol').forEach(el => el.classList.remove('invalid-input-chck'));

        if(cardNumber.length !== 19 || !cardNumberIsValid) {
            document.querySelector('.chck-type-secpay-rowcolcardno').classList.add('invalid-input-chck');
            return false;
        } 
        if(cvv.length < 3 || !cvvIsValid) {
            document.querySelector('.chck-type-secpay-rowcolcvv').classList.add('invalid-input-chck');
            return false;
        } 
        if(!expDateIsValid) {
            document.querySelector('.chck-type-secpay-rowcolexpdate').classList.add('invalid-input-chck');
            return false;
        } 

         checkoutButton.classList.add('chk-loadingbtn');

        // Get random id tranzaction
        let transactionNumber = uuidv4();
        
        // Display loading
        setIsProcessing(true);

        // // // If all good, send details through mail
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : elasticMailUsername,
            Password : elasticMailPassword,
            Port: "2525",
            To : user.email,
            From : myEmail,
            Subject : "Tranzactia" + transactionNumber + "a fost inregistrata!",
            Body : htmlTemplate(transactionNumber)
        }).then(() => {
            // Use this to display the '/order-summary' page
            setSuccessOrder(true)
        })
        .catch((err) => {
            console.log(err);
            setIsProcessing(false),
            document.querySelector('.checkout-error-msg').style.display = 'block !important';
        })
            
    }

    useEffect(() => {
        if(successOrder) {
            console.log(successOrder);
            setTimeout(() => {
                navigate('/order-summary');
            },4000)
        }
    },[successOrder]);


    return (
        <div className="w-100">
            {!proceedToCheckout ? (
                <div className="page-loading-cont">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> 
                </div> 
            ):
            (
                <div id="checkout-container" className="container">
                <h4 className="pagetitle-h4-def">Detalii comanda</h4>


                <div className="checkout-container-wrapper">
                    <div className="checkout-cont-section">
                      
                        <form className="checkout-form-cont" onSubmit={submitForm}>

                            <div className="checkout-cont-row checkout-cont-row-top">
                                <p className="chkcontsec-title">
                                    <span>1</span>
                                    Modalitate de livrare
                                </p>
                            
                            <div>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={selectedValue}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                        value="Livrare prin curier"
                                        control={<Radio />}
                                        label="Livrare prin curier"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                                
                                <div className="chksec-delivery-type">

                                    <div className="chck-type-sec">
                                        <div className="chcktype-secaddress-wrp">
                                            <label htmlFor="chk-form-inp-name" className="form-label">Nume</label>
                                            <input type="text" className="form-control" id="chk-form-inp-name" value={name} onChange={(e) => setName(e.target.value)} onBlur={checkDeliveryAddress} required/>
                                        </div>
                                          <div className="chcktype-secaddress-wrp">
                                            <label htmlFor="chk-form-inp-lastname" className="form-label">Prenume</label>
                                            <input type="text" className="form-control" id="chk-form-inp-lastname"  value={lastName} onChange={(e) => setLastname(e.target.value)} onBlur={checkDeliveryAddress} required/>
                                         </div>
                                    </div>
                                  
                                    <div className="chck-type-sec">
                                        <div className="chcktype-secaddress-wrp">
                                            <label htmlFor="chk-form-inp-phone" className="form-label">Telefon</label>
                                            <input type="text" className="form-control" maxLength={10} id="chk-form-inp-phone"  value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={checkDeliveryAddress} required/>
                                        </div>
                                        <div className="chcktype-secaddress-wrp">
                                            <label htmlFor="chk-form-inp-address" className="form-label">Adresa de livrare</label>
                                            <input type="text" className="form-control" id="chk-form-inp-address"  value={address} onChange={(e) => setAddress(e.target.value)} onBlur={checkDeliveryAddress} required/>
                                        </div>
                                    </div>
                              
                                    <div className="chck-type-sec">
                                        <div className="chcktype-secaddress-wrp">
                                            <label htmlFor="chk-form-inp-city" className="form-label">Oras</label>
                                            <input type="text" className="form-control" id="chk-form-inp-city"  value={city} onChange={(e) => setCity(e.target.value)} onBlur={checkDeliveryAddress} required/>
                                        </div>
                                        <div className="chcktype-secaddress-wrp">
                                            <label htmlFor="chk-form-inp-zip" className="form-label">Cod postal</label>
                                            <input type="text" className="form-control" id="chk-form-inp-zip"  value={zip} onChange={(e) => setZip(e.target.value)} onBlur={checkDeliveryAddress} required/>
                                        </div>
                                    </div>
    
    


                                    </div>
                                </div>

                                <div className="checkout-cont-row">
                                    <p className="chkcontsec-title">
                                        <span>2</span>
                                        Date facturare
                                    </p>
                                    
                                    {addressIsComplete && (
                                    <div className="checkoutcont-row-facdate">
                                    <p className="content-title" >Am preluat datele de facturare din adresa furnizata:</p>

                                        <p>{name} {lastName} - {phone}</p>
                                        <p>{address} - {city}, {zip}</p>
                                    </div>
                                    )}
                                </div>

                                <div className="checkout-cont-row">
                                     <p className="chkcontsec-title">
                                        <span>3</span>
                                        Modalitate de plata
                                    </p>
                                    <div className="checkoutpayment-row-allowedcardswrp">
                                        <img src={credit_cards} alt='' className=''/>
                                    </div>
                                    <div className="checkoutcont-row-payment">
                                        <div className="chck-type-secpay-row">
                                        </div>
                                        <div className="chck-type-secpay-row">
                                            <div className="chck-type-secpay-rowcol">
                                                <label htmlFor="chk-form-inp-paym-fullname" className="form-label">Nume si prenume</label>
                                                <input type="text" className="form-control" id="chk-form-inp-paym-fullname" required/>
                                            </div>
                                            <div className="chck-type-secpay-rowcol chck-type-secpay-rowcolcardno">
                                                <label htmlFor="chk-form-inp-paym-cardno" className="form-label">Numar card</label>
                                                <input type="text" className="form-control" id="chk-form-inp-paym-cardno" maxLength={16} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} onBlur={formatCardNumber} required/>
                                            </div>
                                        </div>
                                        <div className="chck-type-secpay-row">
                                    
                                            <div className="chck-type-secpay-rowcol chck-type-secpay-rowcolcvv">
                                                <label htmlFor="chk-form-inp-paym-cvv" className="form-label">CVV</label>
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="chk-form-inp-paym-cvv" 
                                                    placeholder="CVV" 
                                                    maxLength={3}
                                                    value={cvv} 
                                                    onChange={(e) => setCvv(e.target.value)} 
                                                    onBlur={checkCvv} 
                                                    required/>
                                            </div>
                                            <div className="chck-type-secpay-rowcol chck-type-secpay-rowcolexpdate">
                                                <label htmlFor="chk-form-inp-paym-expdate" className="form-label">Data expirare</label>
                                                <input type="text" className="form-control" id="chk-form-inp-paym-expdate" placeholder="MM / YY" value={expDate} onChange={(e) => setExpdate(e.target.value)} onBlur={formatExpdate} required/>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>

                                <div className="checkout-cont-row mb-0 checkout-cont-row-bottom">
                                    <div className="checkoutcontrow-checkoutsummary">
                                        <div className="checkoutcontrow-checkoutsummary-col checkoutsummary-col-left">
                                            <p className="content-title">Sumar comanda</p>
                                            <div className="checkout-summary-row">
                                                <p>Cost produse:</p>
                                                <p>{cartTotalContext} lei</p>
                                            </div>
                                            <div className="checkout-summary-row">
                                                <p>Cost livrare:</p>
                                                {giveFreeShipping ? (<p>Gratuita</p> ) : (<p >19.99 lei</p>)}
                                            </div>
                                            {giveDiscount && (
                                                <div className="checkout-summary-row">
                                                <p>Discount (peste 6000lei):</p>
                                                <p>-5%</p>
                                            </div>
                                            )}
                                        </div>
                                        <div className="checkoutcontrow-checkoutsummary-col checkoutsummary-col-right">
                                            <p className="content-title">Total: {finalSum} lei</p>
                                            <p className="checkout-error-msg">A intervenit o eroare in procesarea comenzii!</p>
                                            
                                                    <button type="submit"
                                                            className="checkout-pay-btn">
                                                                {!isProcessing ? (
                                                                  <KeyboardDoubleArrowRightIcon />
                                                                ): (
                                                                 <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                )}
                                                           Plateste
                                                    </button>
                                   
                                        </div>
                                    </div>
                                </div>
                            </form>


                    </div>
                </div>
            </div>
            )}


        </div>
    )
  }

  
export default Checkout;