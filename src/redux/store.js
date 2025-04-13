import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popupSlice"; // Import popupReducer từ popupSlice
import authReducer from "./reducers";
import cartReducer from "./cartReducer";
const store = configureStore({
  reducer: {
    popup: popupReducer, // Kết nối reducer của popup vào store
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
