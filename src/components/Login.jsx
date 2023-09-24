import React, {useContext, useEffect, useState} from "react";
import LoginButton from './modules/loginButton';
import { useAuth0 } from "@auth0/auth0-react";
import PersonIcon from '@mui/icons-material/Person';
import googleLogo from '../assets/images/login/google-logo.png';

function Login() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
      if(isAuthenticated) {
          window.location.replace('/my-account');
      } 
    document.title = "Autentifica-te"; 
    }, [isAuthenticated])

    return (
      <div className="login-container-wrapper w-100">
        
        {isAuthenticated || isAuthenticated === null ? (
            <div className="page-loading-cont">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> 
            </div> 
        ):
        (
        <div className="login-container container">
          <h3 className="articleTitle-leftb">Bine ai venit</h3>
          <div className="login-cont-half-wrapper">
              <div className="login-container-half login-container-half-alreadyacc">
                <div>
                 <p className="login-chalf-title">Ai deja cont?</p>
                 <p></p>
                <PersonIcon/>

                </div>
                <div>
                  <LoginButton text='Conecteaza-te' sicon='LoginIcon'/>
                </div>
              </div>
              <div className="login-container-half login-container-half-newacc">
                <div>
                  <p className="login-chalf-title">Client nou?</p>
                  <p>Sau conecteaza-te rapid cu:</p>
                  <img src={googleLogo} alt='Google logo'/>

                </div>
                <div>
                  <LoginButton text='Conecteaza-te cu Google' sicon='GoogleIcon'/>
                </div>
              </div>
          </div>
        </div>
        
        )}

      </div>
    )
  }

export default Login;