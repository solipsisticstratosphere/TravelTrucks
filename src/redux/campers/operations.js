import { createAsyncThunk } from "@reduxjs/toolkit";
import { campersAPI } from "../../api/campersAPI";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const cleanFilters = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== false) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const response = await campersAPI.getCampers(page, cleanFilters);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperDetails = createAsyncThunk(
  "campers/fetchCamperDetails",
  async (id, { rejectWithValue }) => {
    try {
      return await campersAPI.getCamperById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch camper details"
      );
    }
  }
);
