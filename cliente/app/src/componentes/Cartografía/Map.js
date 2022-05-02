import React  from 'react';
import { Box } from '@material-ui/core';
import Title from '../Title/Title';
import { GoogleMap, LoadScript, KmlLayer} from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '70vh'
  };

const center = {
    lat:7.11392,
    lng:-73.1198
}
const Map = () =>{

    return(
    <Box >
        <Title>Cartografía</Title>
        <LoadScript
        googleMapsApiKey="AIzaSyCsIRQS7oa0whj1gyDbKyYciTx8DZoBTlQ"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                <KmlLayer url="https://pastebin.com/raw/203B9ixP"/>
            </GoogleMap>
        </LoadScript>     
    </Box>
    )
}

export default Map