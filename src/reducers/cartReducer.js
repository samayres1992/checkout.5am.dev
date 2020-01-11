import bikeData from '../data/bikerentals';
import { ADD_TO_CART, DECREASE_VALUE, INCREASE_VALUE } from '../actions/types'; 

const initialState = {
  ...bikeData,
  addedItems: [],
  total: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let addedItem = state.products.find(item => item.id === action.id);
      let existedItem= state.addedItems.find(item => action.id === item.id);
      if (existedItem) {
        addedItem.quantity += 1 
        return {
          ...state,
          total: state.total + addedItem.price 
        }
      }
      else {
        addedItem.quantity = 1;
        //calculating the total
        let newTotal = state.total + addedItem.price 
        
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total : newTotal
        }
      }
    case DECREASE_VALUE:
      let updateItems = [ ...state.addedItems ];
      let updateItemsIndex = updateItems.findIndex(item => item.id === action.id);
      let newDecreasedTotal = false;
      let itemPrice = updateItems[updateItemsIndex].price;
      if (updateItems[updateItemsIndex].quantity > 0) {
        updateItems[updateItemsIndex].quantity = updateItems[updateItemsIndex].quantity - 1;
      }

      if (updateItems[updateItemsIndex].quantity === 0) {
        updateItems.splice(updateItemsIndex, 1);
      }

      newDecreasedTotal = state.total - itemPrice;

      return {
        ...state,
        addedItems: updateItems,
        total: newDecreasedTotal ? newDecreasedTotal : state.total
      };
    case INCREASE_VALUE:
      let newItems = [ ...state.addedItems ];
      let newItemsIndex = newItems.findIndex(item => item.id === action.id);
      let newItemsPrice = newItems[newItemsIndex].price;
      let newIncreasedTotal = 0;

      newItems[newItemsIndex].quantity++;
      newIncreasedTotal = state.total + newItemsPrice;
      return {
        ...state,
        addedItems: newItems,
        total : newIncreasedTotal
      };
    default: 
      return state;
  }
}