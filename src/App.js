import './App.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handakeNameBlur = (event) =>{
    setName(event.target.value)
  }

  const handleEmailBlur = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value)
  }

  const handaleRegistered =(event) =>{
    setRegistered(event.target.checked)
  }

  const handaleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
      return; // এই রিটার্ন টা দিলে ভেলিডেশ্ন টা কাজ করতেছে না কাজ করতেছে না 
    }

    if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
      setError('password should conttain at one special character');
      return;
    }
    setValidated(true);
    setError('');

    // console.log(email, password);

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
          const user = result.user;
          console.log(user);
        })
        .catch(error =>{
          console.error(error);
          setError(error.message);
        })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
    }
    event.preventDefault();
  }

  const handlePasswordReset =()=>{
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      console.log('email send')
    })
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(()=>{
      console.log('update your name')
    })
    .catch(error =>{
      setError(error.message);
    })

  }

  const verifyEmail = ()=>{
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent!')
      });
  }

  return (
    <div>
      <div className='reg-form w-25 mx-auto mt-5'>
        <h2 className='text-primary'>Please {registered? 'Login': 'Register'}!!</h2>

        <Form noValidate validated={validated} onSubmit={handaleFormSubmit}>
          { !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handakeNameBlur} type="text" placeholder="Your Name" required />
            <Form.Text className="text-muted">
              Write your full name
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handaleRegistered}  type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className='text-success'>{'success'}</p> {/*succes message show when successful account create*/}
          <p className='text-danger'>{error}</p>
          <Button onClick={handlePasswordReset} variant="link">Forget password?</Button>
          <br/>
          <Button variant="primary" type="submit">
            {registered? 'Login' :'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
