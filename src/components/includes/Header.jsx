import React, {useContext, useState} from "react";
import { MainContext} from "../../MainHome";
import {Link }     from 'react-router-dom'; 
import LogoutButton from "../modules/logoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, LoginIcon, FavoriteBorderIcon,ShoppingCartOutlinedIcon} from './materialui-import';

import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SearchIcon from '@mui/icons-material/Search';

function Header( ) {
  const { cartContext, setCartContext } = useContext(MainContext);
  const { favoritesContext, setFavoritesContext } = useContext(MainContext);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ searchValue, setSearchValue ] = useState('');
    const { productsContext, setProductsContext } = useContext(MainContext);
    const { pureProductsList, setPureProductsList } = useContext(MainContext);
    const [ resultedSearchedList, setResultedSearchedList ] = useState([]);
    const { selectedProduct, setSelectedProduct } = useContext(MainContext);
    const { displayPromotions, setDisplayPromotions } = useContext(MainContext);

    const searchBackdrop = document.querySelector('.main-cont-backdrop');
    
    let typingTimer;
  
    const getSearchValue = (e) => {

        var currentURL = window.location.href;
        var pathSegments = currentURL.split('/');
        var lastPathSegment = pathSegments[pathSegments.length - 1];


        setSearchValue(e.target.value);

        clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {

            let queryTerms = searchValue.split(' ');
            let formatTerms = queryTerms.map(el => el.toLowerCase());

            const filteredProducts = productsContext.filter(product =>
                formatTerms.some(term => product.title.toLowerCase().includes(term))
            )
           
            document.querySelector('.head-searchnav-list').style.display = 'flex';
            setResultedSearchedList(filteredProducts);
                

            if(lastPathSegment !== 'products') {
                if(e.target.value.length === 0) {
                    setPureProductsList(productsContext);
                } else {
                    setPureProductsList(filteredProducts);
                }
            }
        }, 300);
    }

    const displaySearchResults = () => {
       if(searchValue.length === 0) {
        return false;
       } else {
        window.location.href = '/search-results/' + searchValue;
       }
    }

    const handleSearchEnterKey = (e) => {
        if (e.key === "Enter") {
            displaySearchResults();
          }
    }

    const closeSearchList = (e) => {
        // set selected prod to rerender the viewproductinfo
        setSelectedProduct(e);
        // hide suggestions list
        searchBackdrop.classList.remove('searchbackdrop-active');
        document.querySelector('.head-searchnav-list').style.display = 'none';
 
    }

    const handleOnBlurInput = (event) => {
        const searchBackdrop = document.querySelector('.searchbackdrop-active');
        const suggestionsList = document.querySelector('.head-searchnav-list');
        const headerSearchInput = document.getElementById('header-search-input');
    
        // Check if the focus is moving to an element within the suggestions list
        const isMovingToSuggestionsList = suggestionsList.contains(event.relatedTarget);
    
        if (!isMovingToSuggestionsList) {
            // If not moving to the suggestions list, hide the backdrop and suggestions list
            searchBackdrop.classList.remove('searchbackdrop-active');
            suggestionsList.style.display = 'none';
          
        }
    }
    const handleOnFocusInput = () => {
        console.log('zzz');
        searchBackdrop.classList.add('searchbackdrop-active');
    }

  return (
    
            <header className='header-main-container'>
                <div id="addedto-alertview"></div>

                <div className='head-maincont-wrp-row head-maincont-wrp-rowfirst'>
                    <div className="header-user-wrapper container">
                        <span className="head-logo-icon">LOGO</span>
                        
                        <div className="head-searchnav-cont">
                            <input id="header-search-input"
                            type="text" placeholder="Cauta in magazin..." 
                            onChange={(e) => getSearchValue(e)}
                            onBlur={(e) => handleOnBlurInput(e)}
                            onFocus={handleOnFocusInput}
                            onKeyDown={(e) => { handleSearchEnterKey(e)}}/>

                            <span onClick={displaySearchResults}>
                            <i className="bi bi-search"></i>
                            </span>

                            <ul className="head-searchnav-list">
                    
                                {resultedSearchedList.map((el,index) => 
                                     <li key={index} className='navsearch-bar-list-item' onClick={(e) => closeSearchList(el)}>
                                     <Link to={`/viewproduct/${el.id}`}>
                                     <img src={`../images/${el.img}`} alt=''/>
                                         <p>{el.title}</p>
                                     </Link>
                                 </li>
                                )}
                            </ul>
                        </div>
                        <div className="header-wrapbtns">

                                <Link to={'/favorites'} className="head-right-icon btn-def-act">
                                <FavoriteBorderIcon />
                                <span>Favorite</span>
                                {favoritesContext.length > 0 && ( 
                                 <span className="headright-icon-val">{favoritesContext.length}</span>
                                 )}
                                </Link>
                                <Link to={'/cart'} className="head-right-icon btn-def-act">
                                    <ShoppingCartOutlinedIcon />
                                    <span>Cosul meu</span>
                                    {cartContext.length > 0 && ( 
                                    <span className="headright-icon-val">{cartContext.length}</span>
                                    )}
                                    </Link>

                                <PopupState variant="popover" popupId="header-user-dropdown">
                                {(popupState) => (
                                    <React.Fragment>
                                        <button type='button' className='head-useracc-drop head-right-icon' {...bindTrigger(popupState)}>
                                            <PermIdentityOutlinedIcon/>
                                            <span>Contul meu</span>
                                            </button>
                                        <Menu {...bindMenu(popupState)}>
                                            {isAuthenticated ? ( 
                                            <div key={popupState.label}>
                                                <MenuItem onClick={popupState.close}>Salut, {user.nickname}</MenuItem>
                                                <MenuItem onClick={popupState.close}>
                                                <Link to={'/myaccount'}>Contul meu</Link>
                                                </MenuItem>
                                                <MenuItem onClick={popupState.close}><LogoutButton/></MenuItem>
                                            </div>
                                            ) : (
                                            <MenuItem onClick={popupState.close}>
                                                <Link to={'/login'}>Contul meu</Link>
                                            </MenuItem>
                                            )}
                                        </Menu>
                                    </React.Fragment>
                                )}
                                </PopupState>
                        </div>
                    </div>
                </div>

            
                <div className='head-maincont-wrp-row head-maincont-wrp-rowthird'>
                            <div className="container">
                                <Link to={'/products'} aria-label='products' tabIndex='0'>Produse</Link>
                                <Link to={'/offers'}aria-label='promotii' tabIndex='0'>Promotii</Link>
                                <Link to={'/categorii'} aria-label='contact' tabIndex='0'>Categorii</Link>
                                <Link to={'/contact'} aria-label='contact' tabIndex='0'>Contact</Link>
                            </div>
                    </div>

            </header>
      
  );
}

export default Header;
