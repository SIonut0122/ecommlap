import React from 'react'
import ReactDOM from 'react-dom/client'
import MainHome from './MainHome'
import './assets/scss/layout/default.scss';
import { Auth0Provider } from "@auth0/auth0-react";
import { client } from './components/modules/faunadb/db';

 
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_ID; 
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
   domain={domain}
   clientId={clientId}
   useRefreshTokens={true}
   cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: 'http://localhost:5173/myaccount'
    }}
  >
    <MainHome />
  </Auth0Provider>
)
