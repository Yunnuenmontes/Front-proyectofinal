import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoggedInRoute from './components/Routes/LoggedInRoute';
import LoggedOutRoute from './components/Routes/LoggedOutRoute';

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Category from './pages/Category/Category'
import Logout from './pages/Logout/Logout'
import CreateAd from './pages/Ads/CreateAd'
import CreateAdForm from './pages/Ads/CreateAdForm'
import EditAd from './pages/Ads/EditAd';
import Ad from './pages/Ads/Ad'
import MyAds from './pages/Ads/MyAds'
import AllAds from './pages/Ads/AllAds'
import Tutorial from './pages/Landing/Tutorial'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <LoggedOutRoute exact path="/login" component={Login} />
      <LoggedOutRoute exact path="/signup" component={Signup} />
      <LoggedInRoute exact path="/logout" component={Logout} />
      <LoggedOutRoute exact path="/tutorial" component={Tutorial}></LoggedOutRoute>
      <LoggedInRoute exact path="/createAd/:category" component={CreateAdForm}></LoggedInRoute>
      <LoggedInRoute exact path="/editAd/:id" component={EditAd}></LoggedInRoute>
      <LoggedOutRoute exact path="/anuncio/:id" component={Ad}></LoggedOutRoute>
      <LoggedOutRoute exact path="/anuncios" component={AllAds}></LoggedOutRoute>
      <LoggedInRoute exact path="/anuncios/me" component={MyAds}></LoggedInRoute>
      <LoggedOutRoute exact path="/anuncios/new" component={CreateAd}/>
      <LoggedInRoute exact path="/category/:category" component={Category} />
    </Switch>
  </BrowserRouter>
)

export default App;
