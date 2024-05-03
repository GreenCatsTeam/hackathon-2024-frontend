import { YMaps, Map, RoutePanel, Clusterer, Placemark , Panorama} from "@pbe/react-yandex-maps";


const MapView = () => {
    
  
    return (
        <YMaps>
          <Map height={500} width={'auto'} defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
            <RoutePanel options={{ float: "right" }} />
          </Map>
      </YMaps>
    );
  };
  
  export default MapView;
  //<Panorama defaultPoint={[55.733685, 37.588264]} />