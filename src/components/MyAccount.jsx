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



function MyAccount() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { productsContext, setProductsContext } = useContext(MainContext);
  const [ storageAlertList, setStorageAlertList ] = useState([]);
  const [ priceAlertsList, setPriceAlertsList ] = useState([]);


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
  },[])


  const removeAlertPriceItem = (e) => {
    console.log('remove');
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
  return (
        <div className='myaccount-container'>
          <div className="container">
          <h4>Contul meu</h4>
          <div className="myaccount-cont-wrapper">
            <div className="myacc-cont-half-leftmenu">
                <ul>
                  <li>Date personale</li>
                  <li>Comenzile mele</li>
                  <li>Alertele de pret</li>
                  <li>Iesi din cont</li>
                </ul>
              </div>
              <div className="myacc-cont-half-content">
                
                <div className="myacc-conthalf-cont-userdetails myacc-default-box">
                  <p className="myacc-stitle-def">Datele contului</p> 
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
                  <p className="myacc-stitle-def">Activitatea mea</p> 
                  <div className="myacc-conthalfcont-activity-wrp">
                      <div className="myacccont-activity-box myacccont-activity-orders">
                        <WidgetsIcon />
                        <ul>
                          <li>9 comenzi plasate</li>
                          <li><a href="#">Vezi istoric</a></li>
                        </ul>
                      </div>
                      <div className="myacccont-activity-box myacccont-activity-boxfav">
                         <FavoriteIcon />
                          <ul>
                            <li>9 comenzi plasate</li>
                            <li>9 comenzi plasate</li>
                            <li><a href="#">Vezi istoric</a></li>
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

                <div className="myacc-conthalf-cont-pricealerts myacc-default-box">
               
                <p className="myacc-stitle-def"> <NotificationsActiveIcon /> Alerte de pret</p> 
                    <ul>
                        {priceAlertsList.map((el,index) => 
                                <li key={index}>
                                <Link to={`/viewproduct/${el.id}`}>
                                  <img src={`../images/${el.img}`} alt=''/>
                                    <p>{el.title}</p>
                                </Link>
                                <button type="button" data-id={el.id} onClick={(e) => removeAlertPriceItem(el.id)}>x</button>
                            </li>
                          )}
                    </ul>       
                </div>
              </div>
          </div>
          
          </div>
        </div>
  );
}

export default MyAccount;
