import { configureStore } from "@reduxjs/toolkit";
import APISlice from './APIslice'
const store=configureStore({
    reducer:{
        
        groups:APISlice,}
    
})
export default store