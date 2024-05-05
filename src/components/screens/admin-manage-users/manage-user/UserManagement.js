import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  axios  from 'axios';
import React from 'react';

const UserManagement = ({ userid, firstName, lastName, email, city, status, isbanned }) => {

 
  // Function A logic here


  const handleBlockUser = (user_id) => {
    
    const data =  {id:user_id}
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/admin/users/'+user_id.toString(),data, {
      headers: {
        "Content-Type": "application/json",
        "Host": "localhost:8080",
        'Authorization': 'Bearer ' + localStorage.getItem('site'),
        "Content-Length": localStorage.getItem('site').length
      }
  })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  };

  const handleMakeAdmin = (user_id) => {
   
    const data =  {role:'ADMIN'}
    const role = (status==='ADMIN')?'USER':'ADMIN';
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/admin/userRights/'+user_id.toString()+'?role='+role,data, {
      headers: {
        "Content-Type": "application/json",
        "Host": "localhost:8080",
        'Authorization': 'Bearer ' + localStorage.getItem('site'),
        "Content-Length": JSON.stringify(data).length
      }
  })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    
  };

  return (

    <Card style={{ width: '25rem', backgroundColor: isbanned?'tomato':'white' }}>
      <Card.Body>
        <Card.Title> {firstName} {lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{status}</Card.Subtitle>
        <Card.Text> Почта: {email} </Card.Text>
        <Card.Text> Город: {city} </Card.Text>
        <Button variant="secondary" onClick={() => {handleMakeAdmin(userid)}}>Сделать админом</Button>
        <Button variant="danger" onClick={() => {handleBlockUser(userid)}} style={{marginLeft:'50px'}} > {isbanned?'Разблокировать':'Заблокировать'}</Button>
      </Card.Body>
    </Card>

    
  );
};

export default UserManagement;


