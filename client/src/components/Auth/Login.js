import React,{useContext} from "react";
import {GraphQLClient} from 'graphql-request'
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
 import Typography from "@material-ui/core/Typography";


import Context from '../../pages/context'
import {ME_QUERY} from '../../graphql/queries'
import {BASE_URL} from '../../client'


const Login = ({ classes }) => {

  const {dispatch} = useContext(Context)

  const onSuccess = async googleUser => {

    try{ 
    console.log({googleUser})
    const idToken = googleUser.getAuthResponse().id_token
   const client =  new GraphQLClient(BASE_URL,{
      headers : {authorization: idToken}
    })

    const data = await client.request(ME_QUERY)

    console.log({data})
    dispatch({type: "LOGIN_USER", payload: data.me})
    dispatch({type: "IS_LOGGED_IN", payload: googleUser.isSignedIn()})
  
  }catch(err){

    onFailure(err)
  }


  }

  const onFailure = err =>{
console.log('error',err)
  }

  return ( 
    <div className={classes.root}>

    <Typography
    component="h1"
    variant="h3"
    gutterBottom
    nowrap

    style={{color: "rgb(66,133,244)"}}
    >
        Bienvenido a GEOPINS
    </Typography>

    <GoogleLogin clientId="866332901152-ujgmfshhnkro287am2r1tvhifcs9aius.apps.googleusercontent.com" onSuccess={onSuccess} 
  onFailure={onFailure} theme="dark"
  buttonText="Login with Google"
  />
  </div>
  )
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
