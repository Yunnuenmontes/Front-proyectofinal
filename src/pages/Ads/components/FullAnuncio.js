import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
import API from '../../config/API';
import { useHistory } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';

import placeholder from '../../Category/img/placeholder.png';



const FormContainer = styled.div`
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 30px 25px;
  border-radius: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 5px;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const InfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  -moz-box-shadow:    3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow:         3px 3px 5px 6px #ccc;
  padding: 25px;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const AdDescription = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Comments = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin: 5px;

&:hover {
  text-decoration: none;
  color: inherit;
}
`;

const Image = styled.div`
  height: 100%;
  width: 60%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  overflow: hidden;
`;

const Buttons = styled.div`
  width: 100%;
  text-align: end;
  margin-top: auto;
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: 700;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
`;

const CommentsTitle = styled.h2`
  margin-top: 12px;
  font-size: 22px;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  line-height: 3px;
`;

const SubTitle = styled.h4`
  font-size: 22px;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
`;

const Hour = styled.span`
  display: flex;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #F09000;
`;

const Tel = styled.span`
  display: flex;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #16817a;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Name = styled.span`
  margin-top: 10px;
  display: flex;
  font-size: 10px;
  font-family: 'Open Sans', sans-serif;
  color: #9199A1;
  padding: 2px;
`;

const CommentsDesc = styled.div`
  width: 100%;
`;

const Comment = styled.div`
  width: 100%;
  -moz-box-shadow:    3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow:         3px 3px 5px 6px #ccc;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 5px;
`;

const SubmitButton = styled(Button)`
  width: 30%;
  align-self: center;
`;

const FullAnuncio = ({ match, isLoggedIn, isPropietary, serviceDescription, contactotel, contactWhats, nameService, _id, nameContact,  imagenesServicio, horarioServicio, address, city, colonia }) => {
    
    const history = useHistory();
    const [form, setForm] = useState({
        comment: ''
    });
    const [user, setUser] = useState({
    });
    const [comments, setComments] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsButtonEnabled(form.comment);

    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (isLoggedIn === false) {
            alert('Por favor inicia sesión para añadir comentarios');
            return;
        }
        setIsLoading(true);
        try {
            console.log('Form is ready to send to bakend: ', form);
            const user = JSON.parse(window.localStorage.getItem('user'));
            console.log('User is: ', user);
            const newComment = { author: user, text: form.comment, adId: _id };
            const response = await API.post('/comment', newComment);
            if (response.status === 200) {
                setComments(prevArray => [...prevArray, newComment]);
                setIsLoading(false);
            }
            console.log('RESPONSE IS: ', response);
        } catch(err) {
            setIsLoading(false);
            console.log(err);
        }
    }
    const editAd = async e => {
        console.log('Clicked edit');

        history.replace(`/editAd/${_id}`);
    }

    const deleteAd = async e => {
        console.log('Clicked delete');
        const r = window.confirm("¿Estás seguro de que quieres eliminar tu anuncio?");
        if (r == true) {
            setIsLoading(true);
            try {
                const response = await API.delete(`/anuncio/${_id}`);
                console.log('Delete sent and got response: ', response.data);
                setIsLoading(false);
                history.replace('/anuncios/me');
            } catch(e) {
                setIsLoading(false);
                alert('Error eliminando');
            }
            console.log('Delete')
        } else {
            console.log('Good')
        }
    }

    const deleteComment = async (id) => {
        console.log('Clicked delete');
        const r = window.confirm("¿Estás seguro de que quieres eliminar tu comentario?");
        if (r == true) {
            setIsLoading(true);
            try {
                const response = await API.delete(`/comment/${id}`);
                console.log('Delete sent and got response: ', response.data);
                const newComments = comments.filter(c => c._id !== id);
                setComments(newComments);
                setIsLoading(false);
            } catch(e) {
                setIsLoading(false);
                alert('Error eliminando');
            }
            console.log('Delete')
        } else {
            console.log('Good')
        }
    }
    
    const getComments = async () => {
        try {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (user && user._id) {
                setUser(user);
            }
            const response = await API.get(`/comment`);
            console.log('Found comments!: ', response.data);
            setComments(response.data);
            console.log('Comments are now: ', comments);
            setIsLoading(false);
        } catch(e) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getComments();
    }, []);
    
    return (
        <Container>
            <AdDescription>
              <Image>
                <SimpleImageSlider
                    width={'43%'}
                    height={'65%'}
                    images={imagenesServicio.length > 0 ? imagenesServicio.map((i) => { return { url: i } }) : [{ url: placeholder }]}
                    showNavs={true}
                />  
              </Image>
              <InfoContainer>
                  <Title>
                      {nameService}
                  </Title>
                  <SubTitle>
                      {serviceDescription}
                  </SubTitle>
                  <Hour>
                      {horarioServicio}
                  </Hour>
                  <Name>
                      {nameContact}
                  </Name>
                  <Name>
                      {address}, {colonia}, {city}
                  </Name>
                  <Tel>
                      {contactotel}
                  </Tel>
                  <Tel>
                      {contactWhats}
                  </Tel>
                  {isPropietary && <Buttons>
                      <Button color="red" style={{ color: 'dark' }} onClick={editAd}>Edit</Button>
                      <Button color="blue" style={{ color: 'red' }} onClick={deleteAd}>Delete</Button>
                  </Buttons>}
              </InfoContainer>
            </AdDescription>
            <Comments>
                  <CommentsTitle>
                      Comentarios
                  </CommentsTitle>
                  <FormContainer style={{overflow:'auto'}}>
                      <StyledForm onSubmit={handleSubmit}>
                      <FormGroup>
                          <InputGroup>
                              <Input
                                  id="comment"
                                  name="comment" 
                                  type="text" 
                                  value={form.comment} 
                                  onChange={handleInput}
                                  placeholder="Añadir comentario..."
                              />
                              <SubmitButton disabled={!isButtonEnabled}>
                                  {isLoading ? <Spinner size="sm" color="primary" /> : 'Añadir comentario'}
                              </SubmitButton>
                          </InputGroup>
                      </FormGroup>
                      </StyledForm>
                  </FormContainer>
                  <CommentsDesc>
                    {comments.map(comment => (
                        <Comment key={comment._id} {...comment} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                            }}>
                            <SubTitle>{comment.text}</SubTitle>
                            {comment.author === user._id && <FontAwesomeIcon icon={faTrashAlt} onClick={function() { deleteComment(comment._id) }} style={{ cursor: 'pointer' }}/>}
                        </Comment>
                    )).filter(comm => {
                        console.log('comm is', comm);
                        return (comm) ? comm.props.adId === _id : true;
                    })}
                  </CommentsDesc>
            </Comments>
        </Container>
    );
};

export default FullAnuncio;