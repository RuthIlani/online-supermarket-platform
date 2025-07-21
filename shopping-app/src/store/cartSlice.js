import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  categories: [],
  products: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  setProducts,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
