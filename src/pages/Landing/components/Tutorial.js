import React from 'react';
import styled from 'styled-components';

import placeholder from '../img/placeholder.png';

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Steps = styled.div`
  display: flex;
  font-size: 16px;
  color: #9199A1;
  margin: 20px 0;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 0 80px;

  & > div:first-child { 
    height: 220px;
    width: 220px;
    border-radius: 100%;
    margin: 10px 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const steps = [
  {
    img: placeholder,
    label: 'Registrate',
  },
  {
    img: placeholder,
    label: 'Sube la información de tu negocio',
  },
  {
    img: placeholder,
    label: 'Anunciate',
  },
]

const Hero = () => (
  <Container>
    <Title>
      Pasos para anunciarte
    </Title>
    <Steps>
      {steps.map(({ img, label }) => (
        <Step key={label}>
          <div>
            <img src={img} alt={label}/>
          </div>
          <div style={{ color: '#000000' }}>
            {label}
          </div>
        </Step>
      ))}
    </Steps>
  </Container>
);

export default Hero;
