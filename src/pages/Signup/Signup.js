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
  width: 800px;
  padding: 30px 25px;
  height: 70vh;
  overflow-y: auto;
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

const Singup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    genero: '',
    age: '',
    cel: ''
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

    console.log(form);

    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
    setIsButtonEnabled(
      form.email 
      && form.password 
      && form.name 
      && form.genero 
      && form.age 
      && form.cel 
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post('/register', form);
      history.replace('/login');
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
            Singup
          </Title>
          {requestError && <ErrorLabel>Campos incompletos o invalidos</ErrorLabel>}
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
          <FormGroup>
            <Label for="name">
              Nombre
            </Label>
            <InputGroup>
              <Input 
                id="name"
                name="name" 
                type="text" 
                invalid={!form.name}
                onChange={handleInput} 
                value={form.name} 
              />
              <FormFeedback>El campo es requerido</FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="genero">
              Genero
            </Label>
            <InputGroup>
              <Input 
                id="genero"
                name="genero" 
                type="text" 
                invalid={!form.genero}
                onChange={handleInput} 
                value={form.genero} 
              />
              <FormFeedback>El campo es requerido</FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="age">
              Edad
            </Label>
            <InputGroup>
              <Input 
                id="age"
                name="age" 
                type="text" 
                invalid={!form.age}
                onChange={handleInput} 
                value={form.age} 
              />
              <FormFeedback>El campo es requerido</FormFeedback>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="cel">
              Telefono
            </Label>
            <InputGroup>
              <Input 
                id="cel"
                name="cel" 
                type="text" 
                invalid={!form.cel}
                onChange={handleInput} 
                value={form.cel} 
              />
              <FormFeedback>El campo es requerido</FormFeedback>
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

export default Singup;