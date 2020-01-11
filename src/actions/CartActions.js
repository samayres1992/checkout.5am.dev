import { ADD_TO_CART, DECREASE_VALUE, INCREASE_VALUE } from './types'; 

export const addToCart = (id) => {
  return{
    type: ADD_TO_CART,
    id 
  }
}

export const decreaseValue = (id) => {
  return{
    type: DECREASE_VALUE,
    id 
  }
}

export const increaseValue = (id) => {
  return{
    type: INCREASE_VALUE,
    id 
  }
}