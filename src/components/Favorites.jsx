import React, {useContext, useEffect} from "react";
import { MainContext} from "../MainHome";
import ReactStars from "react-rating-stars-component";
import AddToCartBtn from './modules/addtocartbtn';
import {Link }     from 'react-router-dom'; 
import RemoveFavorite from './modules/removefavorite';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import AddedToCartDisplay from './modules/addedtocartdisplay';
import LogoutButton from "./modules/logoutButton";
import LoginButton from "./modules/loginButton";
import { useAuth0 } from "@auth0/auth0-react";

function Favorites( ) {
  const { favoritesContext, setFavoritesContext } = useContext(MainContext);
  const { displayAddedToCartMsg, setDisplayAddedToCartMsg } = useContext(MainContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
 // Set title
  document.title = 'Produse favorite';
  },[])

  return (
        <div className='favorites-container container-fluid'>

              <div id="addedto-alertview"></div>

              <div className="favorites-cont-cont container">
                <div className={!isAuthenticated ? ' fav-useraccount-wrapper' : 'fav-useraccount-wrapper favuseracc-wrp-logged '}>
                <AccountCircleOutlinedIcon/>
                {!isAuthenticated ? (
                  <>
                    <p>Hei, acum esti un user anonim.</p>
                    <p>Intra in contul tau sau inregistreaza-te pentru a-ti pastra produsele favorite. </p>
                    <Link to={'/login'}>
                        <LoginButton showIcon='true'/>
                    </Link>
                  </>
                ):
                (
                  <div className="fav-userbox-right-loggedin">
                   <p>{user.nickname}</p>
                   <Link to={'/user/myaccount'}>Contul meu</Link>
                   <Link to={'/favorite'}>Favorite</Link>
                   <Link to={'/myorders'}>Comenzile mele</Link>
                   </div>
                )}
                </div>
                <div className="favcont-wrpprod-cont">
                <div className="favcont-wrpprodcont-head">
                  <span>Favorite</span>
                  <span>{favoritesContext.length} produse</span>
                </div>
                {favoritesContext.length ? (
                    <div className='favorites-cont-wrapper'>
                      {favoritesContext.map((el,ind) =>
                        <div className='favorite-card-product' key={ind}>
                            <span className="favcard-removemob-icon">
                              <p>In stoc</p>
                              <RemoveFavorite iclassname='fa-solid fa-xmark' removedFromFavorites={el} removeFromFavText=''/>
                            </span>

                          <Link to={`/viewproduct/${el.id}`}>
                            <img src={`https://raw.githubusercontent.com/SIonut0122/ecommlap/develop/images/products_images/${el.id}/1.jpg`} alt={el.title}/>
                          </Link>

                          <div className='fav-card-content'>
                              <p><Link to={`/viewproduct/${el.id}`}>{el.title}, {el.brand}, {el.modelNo}</Link></p>
                              <div className='favcard-stars'>
                                <ReactStars
                                value={2.75}
                                edit={false}
                                count={5}
                                size={30}
                                activeColor="#ffd700"
                                />
                                <span className='favcard-rating'>2.75</span>
                              </div>
                          </div>

                          <div className='fav-card-actions'>
                            <p className="favcard-act-availability">In stoc</p>
                            <p className="favcard-act-price">{el.price} lei</p>
                            <AddToCartBtn addedProduct={el} text='Adauga in cos'/>
                            <RemoveFavorite iclassname='fa-regular fa-trash-can' removedFromFavorites={el} removeFromFavText='Sterge'/>
                          </div>
                        </div>
                      )}
                  </div>
              ) : (
                  <div className="favorites-cont-emptyfav">
                    <FolderSpecialRoundedIcon/>
                      <p>Hmm, niciun produs in lista ta.</p>
                      <p>Uite niste recomandari care te-ar putea inspira.</p>
                      <Link to={'/produse'}>
                         <button type='button' className="btn-def-mid-250">Vezi recomandari</button>
                     </Link>
                    </div>
              )}
                </div>
            </div>
            
        </div>
  );
}

export default Favorites;
