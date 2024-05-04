import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router'
import NavBar from './components/navigation-bar/NavBar';
import { Container} from 'react-bootstrap';
import AuthProvider from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <AuthProvider>
    <Container className='center-block'>
      <br/><br/>
      <Router/>
    </Container>
    </AuthProvider>

  </React.StrictMode>
);



