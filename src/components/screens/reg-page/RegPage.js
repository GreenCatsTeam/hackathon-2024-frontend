import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../../../providers/AuthProvider';
import  axios  from 'axios';


const RegPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  
  const [data, setData] = useState({});

  //const [rememberMe, setRememberMe] = useState(false);
  const auth = useAuth();

  const regAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/registration", data, {
          headers: {
              "Content-Type": "application/json",
              "Host": "localhost:8080",
              "Content-Length": JSON.stringify(data).length.toString()

          }
      }).then(res =>  {
        
        
        auth.loginActionJWT({email:email, jwtToken:res.data.jwtToken})
        return;
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const handleSubmit = (e) => {
    const formData = {
      firstName,
      lastName,
      email,
      password,
      role,
      organization,
      cityName,
      districtName
    };
    setData(formData);
    console.log(data);
    regAction(data);
  };

  

  //{show_alert ? <Alert variant='danger'>Неправильный адрес почты</Alert>:null}
    


  return (
    <Form>
        
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="John" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Doe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@mail.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control onChange={(e) => setRole(e.target.value)} type="text" placeholder="Admin" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicOrganization">
        <Form.Label>Organization</Form.Label>
        <Form.Control onChange={(e) => setOrganization(e.target.value)} type="text" placeholder="Company Inc." />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCityName">
        <Form.Label>City Name</Form.Label>
        <Form.Control onChange={(e) => setCityName(e.target.value)} type="text" placeholder="New York" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDistrictName">
        <Form.Label>District Name</Form.Label>
        <Form.Control onChange={(e) => setDistrictName(e.target.value)} type="text" placeholder="Downtown" />
      </Form.Group>
           
      
      
      <Button onClick={(e) => handleSubmit(e)} variant="primary">
        Регистрация
      </Button>
    </Form>

   
  );
};

export default RegPage;

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
/*
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "organization": "string",
  "cityName": "string",
  "districtName": "string"
} */