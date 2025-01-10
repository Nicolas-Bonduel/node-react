import {configureStore} from '@reduxjs/toolkit';
import storeSlice from './slice/storeSlice';
import cartSlice from './slice/cartSlice';

const store = configureStore({
    reducer: {
        store: storeSlice,
        cart: cartSlice,
    }
});

export default store;