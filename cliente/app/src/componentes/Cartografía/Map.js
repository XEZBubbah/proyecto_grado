import React, { useEffect, useState, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import Title from '../Title/Title';
import { GoogleMap, useLoadScript, Marker, KmlLayer} from "@react-google-maps/api";

const Map = () =>{
    const {isLoaded} = useLoadScript({
        googleMapsApiKey : "21dee9c2ff47493cb045541fc77d1b59",
    })
    const center = useMemo(() => ({lat: 7.11392,lng:-73.1198}),[])
    if(!isLoaded) return <Container>NoMap</Container>

    return(
        <Box sx={{height:1000}}>
            <GoogleMap zoom={10} center={center} width='100%' height='100vh'>
                <KmlLayer url="https://pastebin.com/raw/203B9ixP"/>
            </GoogleMap>
        </Box>
    )
}

export default Map