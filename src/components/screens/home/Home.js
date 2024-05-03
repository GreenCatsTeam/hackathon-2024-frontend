import React from 'react';
import {Row} from 'react-bootstrap';
import { DiAndroid } from "react-icons/di";
import { FaTelegram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () =>{
return (
      
      <Row>
          <h1>Мы заботимся об окружающей среде, присоединяйся!</h1>
          <p>Наша миссия сделать городскую среду чище.</p>
        
        
        <Row><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'><DiAndroid/> Скачать приложение <Badge bg="secondary">Новое</Badge></a></Row>
        
        
        

        <h2 style={{ width: '25rem' }}>Контакты</h2>
        <ListGroup>
            <ListGroup.Item ><CiMail/> greencats@mail.ru</ListGroup.Item>
            <ListGroup.Item><FaTelegram/> @GreenCats</ListGroup.Item>
        </ListGroup>
      </Row>
     
     
    
)
}

export default Home

/*
<div>
    <div>Навигация</div>
    <Link to="/login">Войти</Link>
    <Link to="/verify-cards">Заявки на уборку</Link>
    <Link to="/dashboard">Статистика</Link>
    <Link to="/manage-users">Пользователи</Link>
</div>*/