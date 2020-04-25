import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 45%;
  height: 98%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  -moz-box-shadow:    3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow:         3px 3px 5px 6px #ccc;
  border-radius: 10px;
  background: black;
  color: white;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
  margin-top: 10px;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Image = styled.div`
  width: 100%;
  text-align: center;
  background: white;
  & > img {
    width: 195px;
    object-fit: cover;
  }
`;

const Info = styled.div`
  height: 70px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-top: none;
`;

const Title = styled.h3`
  font-size: 35px;
  font-family: 'Raleway', sans-serif;
  color: #FFFFFF;
`;

const Hour = styled.span`
  display: flex;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #F09000;
`;

const Name = styled.span`
  display: flex;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  color: #FFFFFF;
  margin-top: 18px;
`;

const MyProfile = ({ name, age, email,  cel, genero }) => {
    return (
        <Container>
            <Image>
                <img src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"></img>
            </Image>
            <InfoContainer>
                <Title>{name}, {age}</Title>
                <Name>{email}</Name>
                <Name>{cel}</Name>
                <Name>{genero}</Name>
            </InfoContainer>
        </Container>
    );
};

export default MyProfile;