import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [show_alert, setAlert] = useState(false)


  //const [rememberMe, setRememberMe] = useState(false);
 
  
  
  const handleSubmit = (e) => {
    if (mail.includes('@') && password.length > 5){
      setAlert(false)
    }
    else{
      setAlert(true)
    }
  };

  return (
    <Form>
      {show_alert ? <Alert variant='danger'>Неправильный адрес почты</Alert>:null}
       
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control onChange={(e) => setMail(e.target.value)} type="email" placeholder="greencats@mail.ru" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control  onChange={(e) => setPassword(e.target.value)}   type="password" placeholder="12345" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить" />
      </Form.Group>
      <Button onClick={(e) => handleSubmit()} variant="primary">
        Войти
      </Button>
    </Form>

   
  );
};

export default LoginPage;


/*
 <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
        Remember Me
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
*/