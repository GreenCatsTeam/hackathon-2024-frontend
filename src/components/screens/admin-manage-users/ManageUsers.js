import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import UserManagement from './manage-user/UserManagement';

const UserManage = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://10.124.62.60:8080/users');
            const jsonData = await response.json();
            setCardData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <ListGroup>
      {cardData.map(user => (
        <ListGroup.Item>
        <UserManagement
          userid={user.userid}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          city={user.city}
          status={user.status}
        />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserManage;