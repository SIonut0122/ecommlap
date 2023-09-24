import React, { useState } from "react";

import { MainContext} from "../../MainHome";
import {Link }     from 'react-router-dom'; 
import LogoutButton from "../modules/logoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import logoIcon from '../../assets/images/header/5654360.jpg';
import {FavoriteBorderIcon,ShoppingCartOutlinedIcon,LocalOfferIcon} from './materialui-import';


function MobileMenu() {


    function closeMobileMenu() {
        const mobileContainer = document.querySelector('.mobile-menu-container');
        mobileContainer.classList.remove('show-mobmenu'); // hide mobile menu
        document.querySelector('body').classList.toggle('no-scrolling'); // disable body scroll
    }
   
    return (
        <div className="mobile-menu">
            <div className="mobile-menu-header">
                <button type="button" className="mobile-menu-close" onClick={closeMobileMenu}>
                    <MenuOpenIcon />
                </button>
                <Link to={'/'} className="head-logo-icon"><img src={logoIcon} alt='Ecommercelap'/></Link>
            </div>

            <ul className="mobilemenu-link-list">
                <li className="mobmnu-link-li"><Link to={'/'}><CategoryOutlinedIcon />Produse</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><FavoriteBorderIcon />Favorite</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><ShoppingCartOutlinedIcon />Cos</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><LocalOfferOutlinedIcon />Promotii</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><LocationOnOutlinedIcon />Contact</Link></li>
            </ul>
        </div>
    )
}

export default MobileMenu;
