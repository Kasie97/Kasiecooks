import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const BasketSlice = createSlice({
  name: 'Basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { id, dishName, measurement, price, imageUrl } = action.payload;
    
      // Convert the price to a number
      const priceAsNumber = parseFloat(price);
    
      console.log('Existing Items:', state.items);
      console.log('New Item:', { id, dishName, imageUrl, measurement, price: priceAsNumber });
    
      // Check if the item is already in the basket
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
    
      if (existingItemIndex !== -1) {
        // If the item is in the basket, update its quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If the item is not in the basket, add it with quantity 1
        state.items.push({ id, dishName, imageUrl, measurement, price: priceAsNumber, quantity: 1 });
      }
    },
    
    

    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // If the item is in the basket and its quantity is more than 1, reduce the quantity
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // If the item quantity is 1, remove it from the basket
          state.items = state.items.filter((item) => item.id !== id);
        }
      } else {
        console.warn('Item not found in the basket.');
      }
    },

    deleteFromBasket: (state, action) => {
      const { id } = action.payload;
      // Remove the item from the basket entirely
      state.items = state.items.filter((item) => item.id !== id);
    },
  },

});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, deleteFromBasket } = BasketSlice.actions;

export const selectBasketItems = (state) => state.Basket.items;

export const selectBasketTotal = (state) =>
  state.Basket.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default BasketSlice.reducer;
