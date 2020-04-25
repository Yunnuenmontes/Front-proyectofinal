import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  margin: 20px 0;
`;

const StyledInput = styled(Input)`
  width: 320px;
`;

const StyledButton = styled(Button)`
  width: 80px;
  margin-left: 15px;
`;

const SearchBar = () => (
  <Container>
    <StyledInput type="text" placeholder="¿Qué estás buscando?"/>
    <StyledButton>
      <FontAwesomeIcon icon={faSearch} />
    </StyledButton>
  </Container>
);

export default SearchBar;