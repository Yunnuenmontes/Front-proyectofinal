import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import MyProfile from './components/MyProfile';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
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

import Anuncio from '../Category/components/Anuncio';

import API from '../config/API';

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  padding: 30px;

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

const Anuncios = styled.div`
  padding: 5px 10px;
  display: flex;
  width: 60%;
  overflow-x: auto;
  align-items: center;
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

const MyAds = (props) => {

  const [anuncios, setAnuncios] = useState([]);
  const [user, setUser] = useState({
  });
  const [form, setForm] = useState({
      comment: ''
  });
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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

  const handleInput = e => {
      const { name, value } = e.target
      setForm(prevState => ({
        ...prevState,
        [name]: value
      }));
      setIsButtonEnabled(form.comment);
  };
  const handleSubmit = async e => {
      e.preventDefault();
      setIsLoading(true);
      const userData = await JSON.parse(window.localStorage.getItem('user'));
      if (!userData) {
          alert('Por favor inicia sesión para añadir comentarios');
          return;
      }
      try {
          console.log('Form is ready to send to bakend: ', form);
          const newComment = { author: userData, text: form.comment, adId: '' };
          const response = await API.post('/comment', newComment);
          if (response.status === 200) {
            console.log('Ok actualizar comments');
            console.log('RESPONSE IS: ', response);
            setComments([...comments, newComment]);
            setIsLoading(false);
          }
      } catch(err) {
          setIsLoading(false);
          console.log(err);
      }
  }
  const getCurrentUser = async () => {
      try {
          const userData = await JSON.parse(window.localStorage.getItem('user'));
          console.log(userData);
          setUser({...userData});
          console.log('Now user is: ', user);
          setIsLoading(false);
      } catch(e) {
          setIsLoading(false);
          setError(true)
      }
  };

  const handleRequest = async () => {
    try {
      console.log('Searching for anunicos, with user: ', user);
      const response = await API.get(`/anuncio`);
      setAnuncios(response.data);
      setIsLoading(false);
    } catch(e) {
      setIsLoading(false);
      setError(true)
    }
  };

  const getComments = async () => {
    try {
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
    (async function asyncGetCurrentUser() {
      await getCurrentUser();
      await handleRequest();
      await getComments();
    })();
  }, []);

  return(
    <MainContainer>
      <Navbar />
      <Container>
        <MyProfile {...user}></MyProfile>
        {anuncios ? <Anuncios>
          {anuncios.map(anuncio => (
            <Anuncio {...anuncio} key={anuncio._id} />
          )).filter(anun => {
            return anun ? anun.props.author === user._id : true
          })}
        </Anuncios> : <Spinner></Spinner>}
      </Container>
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
          {comments ? comments.map(comment => (
              <Comment key={comment._id} {...comment} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                  }}>
                  <SubTitle>{comment.text}</SubTitle>
                  {comment.author === user._id && <FontAwesomeIcon icon={faTrashAlt} onClick={function() { deleteComment(comment._id) }} style={{ cursor: 'pointer' }}/>}
              </Comment>
          )).filter(comm => {
              return (comm) ? (comm.props.author === user._id && (!comm.props.adId || comm.props.adId === '')) : true;
          }) : <SubTitle>No hay comentarios para este usuario</SubTitle>}
        </CommentsDesc>
      </Comments>
      <Footer />
      <Loader isOpen={isLoading} />
    </MainContainer>
  )
};

export default MyAds;