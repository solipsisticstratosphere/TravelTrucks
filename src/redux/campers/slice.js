import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperDetails, fetchCampers } from "./operations";

const initialState = {
  items: [],
  total: 0,
  currentPage: 1,
  selectedCamper: null,
  filters: {
    location: "",
    form: "",
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
  favorites: [],
  loading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1;
      state.items = [];
    },
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.favorites.indexOf(camperId);
      if (index === -1) {
        state.favorites.push(camperId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    resetState: (state) => {
      return {
        ...initialState,
        favorites: state.favorites,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (state.currentPage === 1) {
          state.items = action.payload.items || [];
        } else {
          const newItems = action.payload.items || [];
          const existingIds = new Set(state.items.map((item) => item.id));
          const uniqueNewItems = newItems.filter(
            (item) => !existingIds.has(item.id)
          );
          state.items = [...state.items, ...uniqueNewItems];
        }

        state.total = action.payload.total || 0;
        if (action.payload.items?.length > 0) {
          state.currentPage += 1;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(fetchCamperDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, toggleFavorite, resetState } = campersSlice.actions;
export default campersSlice.reducer;
