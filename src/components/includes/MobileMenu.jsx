import React, { useState } from "react";

import { MainContext} from "../../MainHome";
import {Link }     from 'react-router-dom'; 
import LogoutButton from "../modules/logoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

function MobileMenu() {


    function closeMobileMenu() {
        const mobileContainer = document.querySelector('.mobile-menu-container');
        
        mobileContainer.classList.remove('show-mobmenu');
    }
   
    return (
        <div className="mobile-menu">
            <div className="mobile-menu-header">
                <button type="button" className="mobile-menu-close" onClick={closeMobileMenu}>
                    <MenuOpenIcon />
                </button>
                <LogoDevOutlinedIcon/>
            </div>

            <ul className="mobilemenu-link-list">
                <li className="mobmnu-link-li"><Link to={'/'}><ShoppingCartOutlinedIcon />Produse</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><LocalOfferOutlinedIcon />Promotii</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><CategoryOutlinedIcon />Categorii</Link></li>
                <li className="mobmnu-link-li"><Link to={'/'}><LocationOnOutlinedIcon />Contact</Link></li>
            </ul>
        </div>
    )
}

export default MobileMenu;
