import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import UserManagement from './manage-user/UserManagement';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAuth } from '../../../providers/AuthProvider';

const UserManage = () => {
    const [cardData, setCardData] = useState([]);
    const [showBanned, setShowBanned] = useState(false)
    const [showCardData, setShowCards] = useState([])
    
    
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/admin/users', {
              method: "GET",
              headers: {
               
                "Host": "localhost:8080",
                'Authorization': 'Bearer ' +localStorage.getItem('site'),
                "Content-Length": localStorage.getItem('site').length
            }
            });
            const jsonData = await response.json();
            setCardData(jsonData);
            setShowCards(jsonData.filter((card)=>card.isBanned===false));

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    
    useEffect(() => {
      const UpdateCards = async () => {

      if (showBanned)
        setShowCards(cardData);
      else 
        setShowCards(cardData.filter((card)=>card.isBanned===false))};
        
        UpdateCards();

    }, [showBanned])
  

  return (
    <Container>
    <Row>
    
    <Col >
    <p>Заблокированные</p>
    <input class="form-check-input" type="checkbox" id="flexCheckIndeterminate" checked={showBanned} onChange={(e) => setShowBanned(!showBanned)}></input>
    
    <br/>
    <br/>
    
    <p>Поиск</p>
    <input class="form-control" ></input>
    </Col>
    </Row>

    <br/>
    <ListGroup>
      {showCardData.map(user => (
        <ListGroup.Item>
        <UserManagement
          userid={user.userId}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          city={user.city}
          status={user.role}
          isbanned={user.isBanned}
        />
        </ListGroup.Item>
      ))}
    </ListGroup>
    </Container>
  );
};

export default UserManage;