import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  background-color: black;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Open sans', sans-serif;
  padding: 0 150px;
`;

const Info = styled.div`
  display: flex;
  font-size: 16px;
  color: #fff;
  margin: 20px 0;
`;


const Hero = () => (
  <Container>
    <Info>
      Tu comercio local©
    </Info>
  </Container>
);

export default Hero;
