import React, { useState } from 'react';
import styled from 'styled-components';
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormFeedback, 
  InputGroupAddon, 
  InputGroupText, 
  InputGroup,
  Button,
  Spinner
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import Footer from '../../components/Footer/Footer';

import API from '../config/API';

const StyledContainer = styled(MainContainer)`
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 38px;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  margin-bottom: 60px;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 180px);
  background-image: linear-gradient(to bottom, transparent, #6c757d);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px 25px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
`;

const SubmitButton = styled(Button)`
  width: 80%;
  height: 50px;
  margin: 25px 0;
  align-self: center;
`;

const ErrorLabel = styled.div`
  color: #dc3545;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleInput = e => {
    const { name, value } = e.target

    if (name === 'email' ) {
      setEmailError(!validator.isEmail(value));
    }

    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
    setIsButtonEnabled(form.email && form.password && !emailError);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.post('/login', form);
      console.log('Data from db: ', response.data);
      window.localStorage.setItem('user', JSON.stringify({...response.data}));
      history.replace('/');
    } catch {
      setIsLoading(false);
      setRequestError(true);
    }
  }

  return (
    <StyledContainer>
      <Navbar />
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Title>
            Login
          </Title>
          {requestError && <ErrorLabel>Contraseña o email incorrectos</ErrorLabel>}
          <FormGroup>
            <Label for="email">Correo electrónico</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
                id="email"
                name="email" 
                type="text" 
                invalid={emailError}
                onChange={handleInput} 
                value={form.email} 
              />
              <FormFeedback>Correo electrónico inválido</FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Contraseña
            </Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faKey} />
                </InputGroupText>
              </InputGroupAddon>
              <Input 
                id="password"
                name="password" 
                type="password" 
                invalid={!form.password}
                onChange={handleInput} 
                value={form.password} 
              />
              <FormFeedback>La contraseña es requerida</FormFeedback>
            </InputGroup>
          </FormGroup>
          <SubmitButton disabled={!isButtonEnabled}>
            {isLoading ? <Spinner size="sm" color="primary" /> : 'Entrar'}
          </SubmitButton>
        </StyledForm>
      </FormContainer>
      <Footer />
    </StyledContainer>
  )
};

export default Login;