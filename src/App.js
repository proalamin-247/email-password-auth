import './App.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';



const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur =(event)=>{
    setEmail(event.target.value)
  }

  const handlePasswordBlur =(event)=>{
    setPassword(event.target.value)
  }

  const handaleFormSubmit = event =>{
    // console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log(user)
    })
    .catch(error =>{
      console.error(error);
    })
    event.preventDefault();
  }

  return (
    <div>
      {/* <form onSubmit={handaleFormSubmit}>
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
        <br />
        <input onCBlur={handlePasseordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form> */}

      <div className='reg-form w-25 mx-auto mt-5'>
        <h2 className='text-primary'>Please Refister!!</h2>

        <Form onSubmit={handaleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
