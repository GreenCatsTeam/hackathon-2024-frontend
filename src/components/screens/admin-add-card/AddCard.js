import { YMaps, Map,Placemark ,Clusterer} from "@pbe/react-yandex-maps";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import  axios  from 'axios';
import Form from 'react-bootstrap/Form';

const AddCard = () => {
    const [myPosition, setMyPosition] = useState({longitude:50.0,latitude:50.0});  
    const [mapInstance, setMapInstance] = useState(null)
    const [trash, setTrash] = useState([])
    const [markPos, setMarkPos] = useState({x:0,y:0})
    const statusIdMapping = {1:'На модерации',2:'Мусор',3:'Уборка',4:'Проверка',5:'Чисто'}
    const [cursor, setCursor] = useState([])
    const [complexity, setComplexity] = useState(0);
  const [comment, setComment] = useState('');

    
    const handelSumbit = () => {

        const postData = async () => {
            try {
              const response = await axios.post('http://localhost:8080/cards', {
                userId: 1,
                complexity: complexity,
                comment: comment,
                photo: 'string',
                longitude: markPos.x,
                latitude: markPos.y,
                cityName: 'Саратов',
                districtName: 'Кировский район'
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  
                  'Authorization': 'Bearer ' + localStorage.getItem('site')
                }
            });
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          
          postData();

    }

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

const onMapClick = (event) => {
    const xt = event.get("coords")[0];
    const yt = event.get("coords")[1];
    setCursor([{x:xt,y:yt}])
    setMarkPos({
        x:xt,
        y:yt
      }
    );
  };

const statusIcon = {1:verifyIcon, 2:garbageIcon, 3:cleningIcon, 4:checkIcon, 5:doneIcon} 

    return (
        <Row >
        
        <Col>
        <YMaps>
          <image src={'placemarkers/garbage.png'}></image>
          <Map onClick={(e) => {onMapClick(e)}}
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
          <Placemark  options={{
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
        {(markPos===null)?null:<p className='form-control'>longitude: {markPos.x}<br/> latitude: {markPos.y}</p>}
        <Form>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>Комменатрии</Form.Label>
        <Form.Control onChange={(e) => setComment(e.target.value)} type="text" placeholder="Сомнительно но окэй" />
        <Form.Label>Сложность</Form.Label>
        <Form.Control onChange={(e) => setComplexity(e.target.value)} type="number" placeholder={0} />
      
      </Form.Group>
    </Form>
    <Button onClick={handelSumbit}>Создать</Button>
    </Col>
      </Row>
    );
  };
  
  export default AddCard;
  //<Panorama defaultPoint={[55.733685, 37.588264]} />
  //<RoutePanel options={{ float: "right" }} />
  //properties={{ iconContent: '💩'}}
  /*
   {cursor.map((place) =>(
          <Placemark   options={{
            preset:'islands#redIcon',
           
          }}   
            
          defaultGeometry={[ place.x, place.y]}
           />))}*/ 