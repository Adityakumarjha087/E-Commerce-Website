import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      state.totalQuantity += (action.payload.quantity || 1);
      state.totalAmount += (action.payload.price * (action.payload.quantity || 1));
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload);
      } else {
        existingItem.quantity -= 1;
      }
      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;
    },
    updateQuantity: (state, action) => {
      const { id, quantity, price } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        // Calculate the difference in quantity
        const quantityDiff = quantity - existingItem.quantity;
        
        // Update the item quantity
        existingItem.quantity = quantity;
        
        // Update totals
        state.totalQuantity += quantityDiff;
        state.totalAmount += (price || existingItem.price * quantityDiff);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
