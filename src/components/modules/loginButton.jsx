import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import * as Icons from "../includes/materialui-import";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';




const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  const Icon = Icons[props.sicon]

return <button type="button" className='lognewc-btn' onClick={() => loginWithRedirect()}>
  {props.showIcon && <PermIdentityOutlinedIcon/>}
  {props.text ? props.text : 'Intra in cont'}
  </button>

 
};

export default LoginButton;