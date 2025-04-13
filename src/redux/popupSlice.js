// src/redux/popupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    showPopup: false,
    productData: {},
  },
  reducers: {
    showPopup: (state, action) => {
      state.showPopup = true;
      state.productData = action.payload;
    },
    hidePopup: (state) => {
      state.showPopup = false;
      //state.productData = {};
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions; // Xuất actions để sử dụng
export default popupSlice.reducer; // Xuất reducer để sử dụng trong store
