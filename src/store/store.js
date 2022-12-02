import { configureStore } from "@reduxjs/toolkit";
import AuthSlicer from "./Auth/AuthSlicer";
import UserActionSlicer from "./useraction/UserActionSlicer";


const store = configureStore({
    reducer : {
        auth : AuthSlicer,
        useraction : UserActionSlicer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})

export default store