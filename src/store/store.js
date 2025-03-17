import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "../slices/TokenSlice";

export default configureStore({
  reducer: {
    token: TokenReducer,
  },
});
