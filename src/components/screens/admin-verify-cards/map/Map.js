import { YMaps, Map,Placemark ,Clusterer} from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'

const MapView = () => {
    const [myPosition, setMyPosition] = useState({latitude:50.0,longitude:50.0});  
    const [mapInstance, setMapInstance] = useState(null)
    let trash = [
      {latitude:50.0,longitude:55,},
      {latitude:55.0,longitude:55,},
      {latitude:59.0,longitude:50,}
    ];
    
    useEffect(() => {
      const getLocation = async () => {
        try {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
          } else {
            console.log("Geolocation not supported");
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      getLocation();
    }, []);
    
    function success(pos) {
      const crd = pos.coords;
      setMyPosition({latitude:crd.latitude, longitude:crd.longitude})  
    };

    useEffect(() => {
      const setLocation = async () => {
        if (!(mapInstance === null))
          mapInstance.setCenter([ myPosition.latitude, myPosition.longitude])
          
      }
      setLocation();
    }, [myPosition, mapInstance])
  


  
    return (
      
        <YMaps>
          <Map
          instanceRef={(instance) => {setMapInstance(instance)}}
          height={500} 
          width={+'auto'} 
          defaultState={{ center: [myPosition.longitude, myPosition.latitude], zoom: 12 }} >
          <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
          }}
        >
          {trash.map((place) => (<Placemark defaultGeometry={[place.longitude, place.latitude]} />))}
          
          </Clusterer>
          </Map>
          
      </YMaps>
    );
  };
  
  export default MapView;
  //<Panorama defaultPoint={[55.733685, 37.588264]} />
  //<RoutePanel options={{ float: "right" }} />