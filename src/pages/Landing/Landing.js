import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import Footer from '../../components/Footer/Footer';

import Hero from './components/Hero';
import CategoriesOverview from './components/CategoriesOverview';
import Tutorial from './components/Tutorial';
import Description from './components/Description';

const Landing = () => (
  <MainContainer>
    <Navbar />
    <Hero />
    <CategoriesOverview />
    <Tutorial />
    <Description />
    <Footer />
  </MainContainer>
);

export default Landing;