import { YMaps, Map,Placemark ,Clusterer} from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import  axios  from 'axios';

const MapView = () => {
    const [myPosition, setMyPosition] = useState({longitude:50.0,latitude:50.0});  
    const [mapInstance, setMapInstance] = useState(null)
    const [showCard, setShowCard] = useState(null)
    const [trash, setTrash] = useState([])
    
    const statusIdMapping = {1:'На модерации',2:'Мусор',3:'Уборка',4:'Проверка',5:'Чисто'}

    const handleAprove = (card_id) => {
      const data = {};
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:8080/cards/admin/approve/'+card_id.toString(),data, {
        headers: {
          "Content-Type": "application/json",
         
          'Authorization': 'Bearer ' + localStorage.getItem('site')
        }
    })
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }

    const handleRegect = (card_id) => {
      const fetchData = async () => {
        try {
          const response = await axios.delete('http://localhost:8080/cards/'+card_id.toString(), {
        headers: {
          "Content-Type": "application/json",
         
          'Authorization': 'Bearer ' + localStorage.getItem('site')
        }
    })
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }

    const openTrashCard = (place) =>  {
     

      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/cards/'+place.cardId.toString(), {
        headers: {
          "Content-Type": "application/json",
         
          'Authorization': 'Bearer ' + localStorage.getItem('site')
        }
    }).then(res =>  {
      
      setShowCard(res.data);
      return;
    });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();

      
    };


    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const response = await axios.get('http://localhost:8080/cards', {
        headers: {
          "Content-Type": "application/json",
          
          'Authorization': 'Bearer ' + localStorage.getItem('site')
        }
    }).then(res =>  {
      
      setTrash(res.data);
      return;
    });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [myPosition]);


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
const doneIcon = {'iconContent': '✅'}


const statusIcon = {1:verifyIcon, 2:garbageIcon, 3:cleningIcon, 4:checkIcon, 5:doneIcon} 

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
          <Placemark  onClick={()=>{openTrashCard(place)}} options={{
            preset:'islands#greenCircleIcon'
          }}   
            properties={statusIcon[place.statusId]}
            
            defaultGeometry={[ place.latitude, place.longitude]} />))}
            
          </Clusterer>
          
          </Map>
          <br/>
          <Button onClick={() => {success({coords:{longitude:myPosition.longitude,latitude:myPosition.latitude}}) }}> Мое местоположение </Button>
          
      </YMaps>
      </Col>
        
        <Col>
        {showCard===null?<Alert variant={'primary'}>Выберете точку</Alert>:<Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src='https://moyaokruga.ru/img/image_big/04c807ea-2aed-49ec-940d-8ab654e6d265.JPG'/>
      <Card.Body>
        <Card.Title>{statusIdMapping[showCard.statusId]}</Card.Title>
        <Card.Text>
          {showCard.comment}
        </Card.Text>
         <Card.Text>
         Сложность: {showCard.complexity}
         <br/>
          Награда: {showCard.points}
        </Card.Text>
        <Row>{showCard.statusId===1?<Col>
        <Button variant="primary" onClick={() => {handleAprove(showCard.cardId)}}>Принять</Button></Col>:null}
        <Col> 
        <Button variant="danger" onClick={() => {handleRegect(showCard.cardId)}}>Отклонить</Button>
        </Col></Row>
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