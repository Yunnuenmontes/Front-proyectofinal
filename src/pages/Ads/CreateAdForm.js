import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import styled from 'styled-components';
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
import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import logo from '../../components/Navbar/img/logo.png';
import API from '../config/API';
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000000;
  color: #FFFFFF;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px 25px;
  border-radius: 10px;
`;

const Image = styled.div`
  padding: 10px;
  text-align: center;
`;

const Info = styled.div`
  height: 70px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-top: none;
`;

const Title = styled.h3`
  font-size: 28px;
  font-family: 'Raleway', sans-serif;
  color: #649d66;
`;

const Message = styled.h2`
    font-size: 24px;
    font-family: 'Raleway', sans-serif;
    color: #649d66;
    text-align: center;
`;

const SubmitButton = styled(Button)`
  width: 80%;
  height: 50px;
  margin: 25px 0;
  align-self: center;
  background: #f4e04d;
  color: black;
  :disabled {
    background: yellow;
  }
  :hover {
    background: yellow;
    color: black;
  }
`;
const CreateAdForm = ({ nameService, _id, nameContact,  imagenesServicio, horarioServicio, match, history }) => {
    const uploadWidget = e => {
        setIsLoading(true);
        window.cloudinary.openUploadWidget({ cloud_name: 'dktfisirn', upload_preset: 'default-preset', tags:['xmas']},
            function(error, result) {
                if (error || !result) {
                    console.log(error);
                    return;
                }
                console.log(result);
                let finalUrls;
                Promise.all(finalUrls = result.map((r) => {
                    return r.url;
                }));
                setImages(finalUrls);
                setIsLoading(false);
            }
        );
    }
    const handleInput = e => {
        const { name, value } = e.target
        if (e.target.name === 'contactotel' || e.target.name === 'contactWhats') {
            console.log('Cambiando cel')
            if (isNaN(value)) {
                return;
            }
        }
        setForm(prevState => ({
          ...prevState,
          [name]: value
        }));
        console.log('New form is: ',form);
        // setIsButtonEnabled(form.email && form.contactWhats &&  form.serviceDescription && form.horarioServicio && form.colonia && form.delegacion && form.city && form.nameService && form.email && form.contactotel && form.nameContact && form.address);
        setIsButtonEnabled(true);
    };
    const [form, setForm] = useState({
        email: '',
        nameContact: '',
        city: '',
        nameService: '',
        address: '',
        delegacion: '',
        colonia: '',
        horarioServicio: '',
        serviceDescription: '',
        contactotel: 0,
        contactWhats: 0,
        linkFacebook: '',
        linkLinkedin: '',
        imagenIfe: '1234'
    });
    const [images, setImages] = useState([]);
    const [successUpload, setSuccessUpload] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [requestError, setRequestError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Imags are: ', images);
        setIsLoading(true);

        try {
            const user = JSON.parse(window.localStorage.getItem('user'));
            console.log('User is: ', user);
            const newAnuncio = { author: user, ...form, category: match.params.category, imagenesServicio: images };
            console.log('Form is ready to send to bakend: ', form);
            const response = await API.post('/anuncio', newAnuncio);
            if (response.status === 200) {
                console.log('isLoading: ', isLoading);
                console.log('RESPONSE IS: ', response);
                setIsLoading(false);
                setSuccessUpload(true);
            }
        } catch(err) {
            setIsLoading(false);
            console.log(err);
        }
    }

    return (
        <MainContainer>
            <Navbar />
            <Image>
                <img src={logo} style={{ maxWidth: '400px', justifyContent: 'center'}}/>
            </Image>
            {<FormContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="email">Categoría</Label>
                        <InputGroup>
                            <Input
                                id="category"
                                name="email" 
                                type="text" 
                                invalid={emailError}
                                value={match.params.category} 
                                readOnly
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Nombre de contacto</Label>
                        <InputGroup>
                            <Input
                                id="nameContact"
                                name="nameContact" 
                                type="text" 
                                value={form.nameContact} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Nombre del servicio</Label>
                        <InputGroup>
                            <Input
                                id="nameService"
                                name="nameService" 
                                type="text" 
                                value={form.nameService} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    {images.length > 0 ? <Message>¡Tus imágenes están listas para subirse!</Message> : <button onClick={uploadWidget}>Agregar Imágenes</button>}
                    <FormGroup>
                        <Label for="email">Dirección</Label>
                        <InputGroup>
                            <Input
                                id="address"
                                name="address" 
                                type="text" 
                                value={form.address} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Ciudad</Label>
                        <InputGroup>
                            <Input
                                id="city"
                                name="city" 
                                type="text" 
                                value={form.city} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Delegación</Label>
                        <InputGroup>
                            <Input
                                id="delegacion"
                                name="delegacion" 
                                type="text" 
                                value={form.delegacion} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Colonia</Label>
                        <InputGroup>
                            <Input
                                id="colonia"
                                name="colonia" 
                                type="text" 
                                value={form.colonia} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Horario de servicio</Label>
                        <InputGroup>
                            <Input
                                id="horarioServicio"
                                name="horarioServicio" 
                                type="text" 
                                value={form.horarioServicio} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Descripción de servicio</Label>
                        <InputGroup>
                            <Input
                                id="serviceDescription"
                                name="serviceDescription" 
                                type="text" 
                                value={form.serviceDescription} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Teléfono de contacto</Label>
                        <InputGroup>
                            <Input
                                id="contactotel"
                                name="contactotel" 
                                type="tel" 
                                value={form.contactotel} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">WhatsApp de contacto</Label>
                        <InputGroup>
                            <Input
                                id="contactWhats"
                                name="contactWhats" 
                                type="tel" 
                                value={form.contactWhats} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
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
                        <Label>Link de Facebook</Label>
                        <InputGroup>
                            <Input
                                id="linkFacebook"
                                name="linkFacebook" 
                                type="text" 
                                value={form.linkFacebook} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Link de LinkedIn</Label>
                        <InputGroup>
                            <Input
                                id="linkLinkedin"
                                name="linkLinkedin" 
                                type="text" 
                                value={form.linkLinkedin} 
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    {successUpload === true ? 
                        <Container>
                            <Title>Gracias por registrar tu anuncio con nosotros</Title>
                            <SubmitButton onClick={() => { history.replace('/anuncios/me') }}>Continuar!</SubmitButton>
                        </Container> 
                    : <SubmitButton>
                        {isLoading ? <Spinner size="sm" color="primary" /> : 'Crear Anuncio'}
                    </SubmitButton>}
                </StyledForm>
            </FormContainer>}
            <Loader isOpen={isLoading} />
        </MainContainer>
    );
};

export default CreateAdForm;