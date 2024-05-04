import { YMaps, Map,Placemark ,Clusterer} from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const MapView = () => {
    const [myPosition, setMyPosition] = useState({longitude:50.0,latitude:50.0});  
    const [mapInstance, setMapInstance] = useState(null)
    const [showCard, setShowCard] = useState(null)
    const [trash, setTrash] = useState([])
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/cards', {
            method: "GET",
            headers: {
             
              "Host": "localhost:8080",
              'Authorization': 'Bearer ' + localStorage.getItem('site'),
              "Content-Length": localStorage.getItem('site').length
          }
          });
          const jsonData = await response.json();
          setTrash(jsonData);
    
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);


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
  
//эмодзи для меток 💩❗🧹👀
const garbageIcon = {'iconContent': '💩'}
const cleningIcon = {'iconContent': '🧹'}
const checkIcon = {'iconContent': '👀'}
const verifyIcon = {'iconContent': '❓'}

const statusIcon = {1:verifyIcon, 2:garbageIcon, 3:cleningIcon, 4:checkIcon} 

    return (
        <Row >
        
        <Col>
        <YMaps>
          <image src={'placemarkers/garbage.png'}></image>
          <Map
          instanceRef={(instance) => {setMapInstance(instance)}}
          height={500} 
          width={'100%'} 
          options={{maxZoom:20, minZoom:12}}
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
          
          {trash.map((place) => (
          <Placemark  onClick={()=>{setShowCard(place)}} options={{
            preset:'islands#greenCircleIcon'
          }}   
            properties={statusIcon[place.status]}
            
            defaultGeometry={[place.longitude, place.latitude]} />))}
            
          </Clusterer>
          
          </Map>
          <br/>
          <Button onClick={() => {success({coords:{longitude:myPosition.longitude,latitude:myPosition.latitude}}) }}> Мое местоположение </Button>
          
      </YMaps>
      </Col>
        
        <Col>
        {showCard===null?<Alert variant={'primary'}>Выберете точку</Alert>:<Card style={{ width: '20rem' }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {showCard.status}
        </Card.Text>
        
        {showCard.status===1?<Row><Col>
        <Button variant="primary">Принять</Button></Col>
        <Col> 
        <Button variant="primary">Отклонить</Button>
        </Col></Row>:null}
      </Card.Body>
    </Card>}
    </Col>
      </Row>
    );
  };
  
  export default MapView;
  //<Panorama defaultPoint={[55.733685, 37.588264]} />
  //<RoutePanel options={{ float: "right" }} />
  //properties={{ iconContent: '💩'}}