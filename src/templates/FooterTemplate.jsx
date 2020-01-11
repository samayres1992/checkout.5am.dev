import React from 'react';
import { Footer, Container, Content } from 'react-bulma-components';

const FooterTemplate = () => {
  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            <strong>Bike Rentals</strong> by <a href="https://5am.dev">Sam Ayres</a>. 
          </p>
        </Content>
      </Container>
    </Footer>
  );
}

export default FooterTemplate;