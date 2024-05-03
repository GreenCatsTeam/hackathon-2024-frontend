import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import React from 'react';

const UserManagement = ({ userid, firstName, lastName, email, city, status, isbanned }) => {
  const handleBlockUser = () => {
    // Logic to block user
  };

  const handleMakeAdmin = () => {
    // Logic to make user admin
  };

  return (

    <Card style={{ width: '25rem', backgroundColor: isbanned?'tomato':'white' }}>
      <Card.Body>
        <Card.Title> {firstName} {lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{status===1?'Admin':'User'}</Card.Subtitle>
        <Card.Text> Почта: {email} </Card.Text>
        <Card.Text> Город: {city} </Card.Text>
        <Button variant="secondary" onClick={handleMakeAdmin}>Сделать админом</Button>
        <Button variant="danger" onClick={handleBlockUser} style={{marginLeft:'50px'}} > {isbanned?'Разблокировать':'Заблокировать'}</Button>
      </Card.Body>
    </Card>

    
  );
};

export default UserManagement;


