import React, { Component, Fragment } from 'react';
import { Card, Media, Heading, Tag, Columns, Button } from 'react-bulma-components';
import { connect } from 'react-redux';
import { addToCart } from '../actions/index';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../styles/notifications.css';

class Shop extends Component {

  createNotification = (type, name=null) => {
      switch (type) {
        case 'success':
          NotificationManager.success(name + ' added to cart');
          break;
        case 'failure':
          NotificationManager.error('Item could not be added to cart');
          break;
        default:
          return;
      }

  }

  addItemToCard = (item) => {
    try {
      this.props.addToCart(item.id);
      this.createNotification("success", item.name);
    }
    catch {
      this.createNotification("failure");
    } 
  }

  render() {
    return (
      <Fragment>
        <Columns>
          { this.props.products.map( item => (
            <Columns.Column size={6} key={item.id} id={item.id}>
              <Card>
                <Card.Image size="4by3" src={item.image} />
                <Card.Content>
                  <Media>
                    <Media.Item>
                      <Heading size={4}>{ item.name }</Heading>
                      <Heading subtitle size={6}>${ item.price.toFixed(2) }</Heading>
                      <Tag>
                        { item.product_type }
                      </Tag>
                    </Media.Item>
                  </Media>
                  <Button onClick={()=>{this.addItemToCard(item)}}>
                    Add item to cart
                  </Button>
                </Card.Content>
              </Card>
            </Columns.Column>
          ))}
        </Columns>
        <NotificationContainer/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products  
  }
}

const mapDispatchToProps = (dispatch) =>{
 return{
    addToCart: (id)=> { dispatch(addToCart(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
