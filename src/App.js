import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bulma-components';
import HeaderTemplate from './templates/HeaderTemplate';
import FooterTemplate from './templates/FooterTemplate';
import Shop from './components/Shop';
import Cart from './components/Cart';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <HeaderTemplate />
      <Container className="content-container">
        <Switch>   
          <Route exact path="/" component={ Shop } />
          <Route exact path="/cart" component={ Cart } />
        </Switch>
      </Container>
      <FooterTemplate />
    </BrowserRouter>
  );
}

export default App;
