import React ,{useState,useEffect,useContext} from "react";
import ReactMapGL ,{NavigationControl,Marker} from 'react-map-gl'
import { withStyles } from "@material-ui/core/styles";
import {useClient} from '../client'
import {GET_PINS_QUERY} from '../graphql/queries'
import PinIcon from './PinIcon'
import Context from '../pages/context'
import Blog from './Blog'
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}


const Map = ({ classes }) => {

  const client = useClient()
  const {state,dispatch} = useContext(Context)
  const [viewport ,setViewport ] = useState(INITIAL_VIEWPORT)
  const [userPosition,setUserposition] = useState(null)

  useEffect(()=>{

    getUserPosition()

  },[])

  useEffect(()=>{

    getPins()

  },[])
  
  const getPins = async () => {
    const {getPins} = await client.request(GET_PINS_QUERY)
    console.log({getPins})
  }
  
  const getUserPosition = () => {

    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        const {longitude , latitude} = position.coords

        setViewport({ ...viewport, latitude,longitude })
        setUserposition({latitude,longitude})
      })
    }


  }


  const handleMapClick = ({lngLat,leftButton}) => {
    if(!leftButton)return
    if(!state.draft){
      dispatch({type: "CREATE_DRAFT"})
    }
    const [longitude,latitude] = lngLat
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: {longitude,latitude}
    })

  }

  return (
    <div className={classes.root}>
        <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZXplYWJjZGUiLCJhIjoiY2tpd3Ixc2p0MXo3ZzJxcDR0cnRycGRrbiJ9.0X06PMsFMoN5hOzj8MQgDQ"
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
        onClick={handleMapClick}
        >
          <div className={classes.navigationControl}>
            <NavigationControl
              
              onViewportChange={newViewport => setViewport(newViewport)}

            />
          </div>

          {userPosition && (

              <Marker
              latitude={userPosition.latitude}
              longitude={userPosition.longitude}
              offsetLeft={0}
              offsetTop={0}
              >
                <PinIcon size={40}  color="red" />

              </Marker>

          )}
          {state.draft && (

<Marker
              latitude={state.draft.latitude}
              longitude={state.draft.longitude}
              offsetLeft={0}
              offsetTop={0}
              >
                <PinIcon size={40}  color="hotpink" />

              </Marker>
          )}
        </ReactMapGL>
        <Blog/>
    </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
