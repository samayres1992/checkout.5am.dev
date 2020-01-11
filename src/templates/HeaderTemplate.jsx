import React, { Component } from 'react';
import { Navbar, Container } from 'react-bulma-components';
import { Link } from 'react-router-dom';

class HeaderTemplate extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    }
  }

  handleOpen = () => { 
    const { active } = this.state;
    this.setState({ active: !active }); 
 }
  
  render () {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Navbar.Item renderAs="div">
              <Link to="/">Bike Rentals</Link>
            </Navbar.Item>
          </Navbar.Brand>
          <Navbar.Menu >
            <Navbar.Container position="end">
              <Navbar.Item renderAs="div">
                <Link to="/cart">My Cart</Link>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Container>
      </Navbar>
    )
  }
}

export default HeaderTemplate;