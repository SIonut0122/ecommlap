import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext, useState } from "react";
import MainHome, { MainContext} from "../MainHome";
// import getAllProducts from './modules/faunadb/getProducts';
import Button from '@mui/material/Button';
import { useNavigate }   from 'react-router-dom'; 
import WidgetsIcon from '@mui/icons-material/Widgets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {Link }     from 'react-router-dom'; 
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


function MyAccount() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const navigate = useNavigate();
  const { productsContext, setProductsContext } = useContext(MainContext);
  const [ storageAlertList, setStorageAlertList ] = useState([]);
  const [ contactMobMenuOpened, setContactMobMenuOpened ] = useState(false);
  const [ priceAlertsList, setPriceAlertsList ] = useState([]);
  const { favoritesContext, setFavoritesContext } = useContext(MainContext);
  const [ displayAccountDataContainer , setDisplayAccountDataContainer ] = useState(true); 
  const [ displayPriceAlertContainer , setDisplayPriceAlertContainer ] = useState(false); 
  const [ displayAddressContainer, setDisplayAddressContainer ] = useState(false); 
  const [ displayOrdersContainer, setDisplayOrdersContainer ] = useState(false); 
  

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await getAllProducts;
  //     if(data) {
  //       console.log(data[0].data);
  //     }
  //   }

  //   fetchProducts() 
  //   .catch(console.error);
  // },[])

  useEffect(() => {
    if (localStorage.getItem('priceAlertList') !== null) {
      let priceAlertsIds = localStorage.getItem("priceAlertList"); 
      const parsedPriceAlertsIds = JSON.parse(priceAlertsIds);

 
      const alertsList = productsContext.filter(product =>
        priceAlertsIds.includes(product.id)
      );
      setPriceAlertsList(alertsList);

  } else {
      console.log(`priceAlertList not found`);
  }

   // Set title
   document.title = 'Contul meu';

  },[])


  const handleNabBtns = (e) => {
    let navValue = e.target.getAttribute('data-myacc-nav');
    setDisplayAddressContainer(false);
    setDisplayPriceAlertContainer(false);
    setDisplayAccountDataContainer(false);
    setDisplayOrdersContainer(false);

        switch(navValue) {
        case 'info':
            setDisplayAccountDataContainer(true);
        break;
        case 'orders':
          setDisplayOrdersContainer(true);
        break;
        case 'alerts':
        
          setDisplayPriceAlertContainer(true);
        break;
        case 'address':
          setDisplayAddressContainer(true);
        break;
        case 'logout':
        break;
      default:
        return;
    }
  }
  const removeAlertPriceItem = (e) => {
    let priceAlertList = JSON.parse(localStorage.getItem('priceAlertList')) || [];
    setStorageAlertList(priceAlertList);
    let freshPriceIdsList = priceAlertList.filter(el => el !== e);
    localStorage.setItem('priceAlertList', JSON.stringify(freshPriceIdsList));
    
    setPriceAlertsList(prevPriceAlertsList => {
      const alertsListNew = prevPriceAlertsList.filter(product =>
        freshPriceIdsList.includes(product.id)
      );
      return alertsListNew;
    });
 
  }

  useEffect(() => {
  },[isAuthenticated])

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if(!isAuthenticated) {
    navigate('/login');
  }

  const openMyAccMobMenu = () => {
      if(!contactMobMenuOpened) {
        setContactMobMenuOpened(true);
      } else {
        setContactMobMenuOpened(false);
      }

      document.querySelector('.contact-ullist-left').classList.toggle('hidemob-ul-list');

  }

  return (
        <div className='myaccount-container'>
          <div className="container">
          <h4>Contul meu</h4>
          <div className="myaccount-cont-wrapper">
            <div className="myacc-cont-half-leftmenu">
                <div className="myacc-cotnhalf-left-mobhambmenu" onClick={openMyAccMobMenu}>
          
                  {!contactMobMenuOpened ? (
                    <MenuIcon/>
                  ): (
                    <MenuOpenIcon/>
                  )}

                </div>
                <ul className="contact-ullist-left hidemob-ul-list">
                  <li className="myacc-leftmenu-btn" data-myacc-nav='info' onClick={(e) => handleNabBtns(e)}><PersonOutlineOutlinedIcon /> Date personale</li>
                  <li className="myacc-leftmenu-btn" data-myacc-nav='orders' onClick={(e) => handleNabBtns(e)}><Inventory2OutlinedIcon/> Comenzile mele</li>
                  <li className="myacc-leftmenu-btn" data-myacc-nav='alerts' onClick={(e) => handleNabBtns(e)}><NotificationsActiveOutlinedIcon /> Alertele de pret</li>
                  <li className="myacc-leftmenu-btn" data-myacc-nav='address' onClick={(e) => handleNabBtns(e)}><ContactMailOutlinedIcon /> Adresa de livrare</li>
                  <li className="myacc-leftmenu-btn" data-myacc-nav='logout' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><LogoutOutlinedIcon /> Iesi din cont</li>
                </ul>
              </div>
              <div className="myacc-cont-half-content">
              
              {/* USER INFO SECTION */}
              {displayAccountDataContainer && 
                <>
                <div className="myacc-conthalf-cont-userdetails myacc-default-box">
                  <p className="myacc-stitle-def"><PersonIcon /> Datele contului</p> 
                  <div className="myacc-conthalfcont-userdetails-wrp">
                    <img id="myacc-user-avatar" src={user.picture} alt=""/>
                    <div className="myacccont-cont-details">
                      {user.given_name ? (
                        // gmail
                          <div className="myaccount-cont-det-gmail">
                            <div>
                              <span>Nickname</span>
                              <span>{user.nickname}</span>
                            </div>
                            <div>
                              <span>Prenume</span>
                              <span>{user.given_name}</span>
                              </div>
                              <div>
                              <span>Nume</span>
                              <span>{user.family_name}</span>
                              </div>
                              <div>
                              <span>Email</span>
                              <span>{user.email}</span>
                              </div>
                          </div>
                      ) :
                      (
                        // normal account
                        <div className="myaccount-cont-det-normal">
                            <div>
                              <span>Nickname</span>
                              <span>{user.nickname}</span>
                            </div>
                            <div>
                              <span>Nume</span>
                              <span>{user.name}</span>
                              </div>
                              <div>
                              <span>Email</span>
                              <span>{user.email}</span>
                              </div>
                          </div>

                      )}

                    </div>
                  </div>
                </div>

                
                <div className="myacc-conthalf-cont-activity myacc-default-box"> 
                  <p className="myacc-stitle-def"><SignalCellularAltIcon /> Activitatea mea</p> 
                  <div className="myacc-conthalfcont-activity-wrp">
                      <div className="myacccont-activity-box myacccont-activity-orders">
                        <WidgetsIcon />
                        <ul>
                          <li>9 comenzi plasate</li>
                          <li><a href="#">Vezi comenzi</a></li>
                        </ul>
                      </div>
                      <div className="myacccont-activity-box myacccont-activity-boxfav">
                         <FavoriteIcon />
                          <ul>
                            <li>{favoritesContext.length} favorite</li>
                            <li><Link to={'/favorites'}>Vezi favorite</Link></li>
                          </ul>
                      </div> 
                      <div className="myacccont-activity-box myacccont-activity-reviews">
                      <StarIcon />
                          <ul>
                            <li>2 review-uri</li>
                           
                            <li><a href="#">Vezi review-uri</a></li>
                          </ul>
                      </div>       
                  </div>
                </div>
                </>
              }

              {/* ORDERS SECTION */}
              {displayOrdersContainer && 
                <div className="myacc-default-box">
                  <p className="myacc-stitle-def"> <Inventory2OutlinedIcon/> Comenzile mele</p>
                  <div className="myacc-myorders-wrapper">
                  <p className="myacc-alert-emptymsg">Nu s-a gasit istoricul comenzilor</p>
                  </div>
                </div>
                }
                
              {/* PRICE ALERT SECTION */}
              {displayPriceAlertContainer && 
                <div className="myacc-conthalf-cont-pricealerts myacc-default-box">
                    <p className="myacc-stitle-def"> <NotificationsActiveIcon /> Alerte de pret</p> 
                    <ul>
                    {priceAlertsList.length > 0 ? (
                       <>
                       {priceAlertsList.map((el,index) => 
                                <li key={index}>
                                <Link to={`/viewproduct/${el.id}`}>
                                  <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${el.id}/1.jpg`} alt=''/>
                                    <p>{el.title}</p>
                                </Link>
                                <button type="button" data-id={el.id} title='Elimina de la alerte' onClick={(e) => removeAlertPriceItem(el.id)}><i className="fa-solid fa-xmark"></i></button>
                            </li>
                          )}
                       </>
                    ) : (
                          <p className="myacc-alert-emptymsg">Nu aveti setate alerte de pret</p>
                    )}
                    </ul>       
                </div>
              }

              {/* DELIVERY ADDRESS SECTION */}
              {displayAddressContainer && 
                <div className="myacc-default-box myacc-address-box">
                <p className="myacc-stitle-def"><ContactMailIcon /> Adresa de livrare</p> 
                    <form method="POST" action="" id="user-accform-address">
                        <div className="chck-type-sec">
                            <div className="chcktype-secaddress-wrp">
                                <label htmlFor="chk-form-inp-name" className="form-label">Nume si prenume</label>
                                <input type="text" className="form-control" id="chk-form-inp-name" required/>
                            </div>
                            <div className="chcktype-secaddress-wrp">
                              <label htmlFor="chk-form-inp-lastname" className="form-label">Adresa completa</label>
                              <input type="text" className="form-control" id="chk-form-inp-lastname" placeholder="Strada,bl.5,et.2,ap.12" required/>
                            </div>
                      </div>
                      <div className="chck-type-sec mt-2">
                            <div className="chcktype-secaddress-wrp">
                                <label htmlFor="chk-form-inp-name" className="form-label">Oras</label>
                                <input type="text" className="form-control" id="chk-form-inp-name" required/>
                            </div>
                            <div className="chcktype-secaddress-wrp">
                              <label htmlFor="chk-form-inp-lastname" className="form-label">Telefon</label>
                              <input type="text" className="form-control" id="chk-form-inp-lastname" required/>
                            </div>
                      </div>
                      <div className="chck-type-sec mt-2">
                            <div className="chcktype-secaddress-wrp">
                              <label htmlFor="chk-form-inp-lastname" className="form-label">Specificatii</label>
                              <input type="text" className="form-control" id="chk-form-inp-lastname" placeholder="Interfon,etc."required/>
                            </div>
                      </div>
                      
                      <button type="submit" className="btn-def-mid-250 mt-4">Salveaza</button>
                    </form>
                </div>
              }
                
              </div>
          </div>
          
          </div>
        </div>
  );
}

export default MyAccount;
