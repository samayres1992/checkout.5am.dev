import React, { Component, Fragment } from 'react';
import { decreaseValue, increaseValue } from '../actions/index';
import { Columns, Button, Modal, Section, Table } from 'react-bulma-components';
import { connect } from 'react-redux';

class Shop extends Component {

  constructor() {
    super();
    this.state = {
      allowRental: false,
      show: false
    }
  }

  componentWillMount() {
    this.props.addedItems.find(item => { if (item.product_type === "bike" ) {
      this.setState({
        allowRental: true
      });
    }});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.addedItems !== prevProps.addedItems) {
      this.props.addedItems.find(item => { if (item.product_type === "bike" ) {
        this.setState({
          allowRental: true
        });
      } else {
        this.setState({
          allowRental: false
        });
      }});
    }
  }

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  decreaseValue = (item) => {
    this.props.decreaseValue(item);
  }

  increaseValue = (item) => {
    this.props.increaseValue(item);
  }

  render() {
    let addedItems = this.props.addedItems.length ?
      ( 
        this.props.addedItems.map(item=> { 
          return (
            <tr key={item.id}>
              <td>
                { item.name }
              </td>
              <td>
                ${ item.price.toFixed(2) }
              </td>
              <td>
                { item.product_type }
              </td>
              <td>
                <Button className="decrease" onClick={()=> this.decreaseValue(item.id) }>-</Button> 
                { item.quantity }
                <Button className="increase" onClick={()=> this.increaseValue(item.id) }>+</Button>
              </td>
            </tr>
          )
        }
      )) 
      : (<tr><td>Nothing added to cart, yet!</td></tr>);

    const renderCheckout = this.state.allowRental ? <Button onClick={this.open} className="is-pulled-right">Checkout</Button> : <span className="is-pulled-right">You must add a bike to complete checkout</span>

    return (
      <Fragment>
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            { addedItems }
          </tbody>
        </Table>
        <Columns>
          <Columns.Column>
            Total cost: ${ this.props.total.toFixed(2) }
          </Columns.Column>
          <Columns.Column>
            { renderCheckout }
            <Modal show={this.state.show} onClose={this.close}>
              <Modal.Content>
                <Section style={{ backgroundColor: 'white' }}>
                  Thanks for reviewing my bike rental checkout!
                </Section>
              </Modal.Content>
            </Modal>
          </Columns.Column>
        </Columns>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,  
    addedItems: state.addedItems,
    total: state.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    decreaseValue: (id) => { dispatch(decreaseValue(id)) }, 
    increaseValue: (id) => { dispatch(increaseValue(id)) },
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
