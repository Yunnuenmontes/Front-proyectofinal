import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import Footer from '../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

import FullAnuncio from './components/FullAnuncio';

import API from '../config/API';

const Container = styled.div`
  padding: 30px;
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Anuncios = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Ad = props => {
  const [user, setUser] = useState({});
  const [anuncios, setAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { params: { category } } = props.match;

  const handleRequest = async () => {
    try {
      const userData = await JSON.parse(window.localStorage.getItem('user'));
      console.log(userData);
      setUser({...userData});
      const response = await API.get(`/anuncio?category=${category}`);
      console.log(response.data);
      setAnuncios(response.data);
      setIsLoading(false);
    } catch(e) {
      setIsLoading(false);
      setError(true)
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <MainContainer>
      <Navbar />
      { error ?
        <Error />
      :
        <Container>
          <Anuncios>
            {anuncios.map(anuncio => (
              <FullAnuncio {...anuncio} isLoggedIn={(user && user._id) ? true : false} isPropietary={user._id === anuncio.author ? true : false} key={anuncio._id} />
            )).filter(anun => {
                return anun ? anun.props._id === props.match.params.id : true
            })}
          </Anuncios>
        </Container>
      }
      <Footer />
      <Loader isOpen={isLoading} />
    </MainContainer>
  )
};

export default Ad;
