import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async thunks
export const fetchCategoriesAndProductsAsync = createAsyncThunk(
  'cart/fetchCategoriesAndProducts',
  async () => {
    const response = await api.fetchCategoriesAndProducts();
    return response;
  }
);

export const submitOrderAsync = createAsyncThunk(
  'cart/submitOrder',
  async (orderData) => {
    const response = await api.submitOrder(orderData);
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder
      // fetchCategoriesAndProductsAsync
      .addCase(fetchCategoriesAndProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAndProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.products = action.payload.products;
      })
      .addCase(fetchCategoriesAndProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // submitOrderAsync
      .addCase(submitOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Clear cart after successful order submission
        state.cartItems = [];
      })
      .addCase(submitOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
