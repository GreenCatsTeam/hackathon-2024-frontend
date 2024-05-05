import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import React, { useEffect } from "react";
import { useAuth } from '../../providers/AuthProvider';


const NavBar = () => {
 
    return(
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">Зеленные коты</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          <Nav.Link href="/verify-page">Заявки на уборку</Nav.Link>
          
          <Nav.Link href="/add-card">Добавить заявку</Nav.Link>
          
          <Nav.Link href="/manage-users">Управление пользователями</Nav.Link>
          <Nav.Link href="/dashboard">Статистика</Nav.Link>
          
        </Nav>
        <Nav className="d-flex">
        <Nav.Link href="/login-page">Войти</Nav.Link>
        <Nav.Link href="/registration-page">Регистрация</Nav.Link>
        
        </Nav>
       </Navbar.Collapse> 
        
      
    </Container>
  </Navbar>
    )
} 


export default  NavBar

