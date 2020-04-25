import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 180px);
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const Message = styled.h2`
  font-size: 38px;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  margin-bottom: 60px;
  text-align: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 96px;
`;


const Error = () => (
  <Container>
    <Message>
      Hubo un error en el servidor
    </Message>
    <StyledIcon icon={faExclamationTriangle} />
  </Container>
);

export default Error;