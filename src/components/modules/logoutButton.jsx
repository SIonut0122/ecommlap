import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
 
<button type='button' className="btn-logout-default" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
  );
};

export default LogoutButton;