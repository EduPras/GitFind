import React, { useEffect, useState } from 'react';
import '../styles/maps.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Leaflet from 'leaflet';

import imgMarker from '../styles/map-pin.svg';

import 'leaflet/dist/leaflet.css'

const mapIcon = Leaflet.icon({
    iconUrl: imgMarker,
    iconSize: [40,40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
})



function Maps(){
    const [markers, setMarkers] = useState([]);

    useEffect(()=>{
        async function getMarkers (){
        try {        
            const {data} = await axios.get('http://localhost:3333/map')
            setMarkers(data.filtredMarkers);           
        } catch (error) {
            console.log(error)
        }
    }
    getMarkers();        
    },[])

    
    

    return(
        <div id="maps">
            <input type="text" placeholder="Search" onChange={()=> console.log(markers)}/>
            <Map
                center={[-24.9556467,-53.4662277]}
                zoom={15}
                style={{ width:'100%', height:'100%' }}
            >

                {markers.map(m=>(
                    <Marker
                        icon={mapIcon}
                        position={[parseFloat(m[0]), parseFloat(m[1])]}>

                            <Popup closeButton={false} minWidth={70} className="popup">
                                @{m[2]}
                            </Popup>

                    </Marker>
                ))}
                
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>


        </div>
    )
}

export default Maps;