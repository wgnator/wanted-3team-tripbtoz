import { createSlice } from '@reduxjs/toolkit';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: {
    temporary: {
      hotelName: '',
      checkInDate: '',
      checkOutDate: '',
      numberOfGuests: '',
    },
    determined: {
      hotelName: '',
      checkInDate: '',
      checkOutDate: '',
      numberOfGuests: '',
    },
  },
  reducers: {
    setQuery: (state, action) => {
      state.temporary = { ...state.temporary, ...action.payload };
      console.log('stored in Redux: ', state.temporary);
    },
    determineQuery: (state) => {
      state.determined = { ...state.temporary };
      console.log('query determined: ', state.determined);
    },
  },
});

export const { setQuery, determineQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
