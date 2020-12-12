import React from "react";
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {

  const onSuccess = googleUser => {
    console.log({googleUser})
    const idToken = googleUser.getAuthResponse().id_token

    console.log({idToken})

  }

  return <GoogleLogin clientId="866332901152-ujgmfshhnkro287am2r1tvhifcs9aius.apps.googleusercontent.com" onSuccess={onSuccess} />
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
