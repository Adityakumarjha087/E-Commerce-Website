import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    searchQuery: '',
  },
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.filters.rating = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload.toLowerCase();
    },
    applyFilters: (state) => {
      const { category, priceRange, rating, searchQuery } = state.filters;
      
      state.filteredProducts = state.products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesRating = Math.floor(product.rating.rate) >= rating;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery) || 
                             product.description.toLowerCase().includes(searchQuery);
        
        return matchesCategory && matchesPrice && matchesRating && matchesSearch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPriceRange, setRating, setSearchQuery, applyFilters } = productsSlice.actions;
export default productsSlice.reducer;
