import React,{useContext}from "react";
import {GoogleLogout} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";

import Context from '../../pages/context'


const Signout = ({ classes }) => {

  const {dispatch} = useContext(Context)
  const onSignout = () => {
    dispatch({type: "SIGNOUT_USER"})
  }
  
  return(
    <GoogleLogout
      buttonText="Signout"
      onLogoutSuccess={onSignout}
    />
  )
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
