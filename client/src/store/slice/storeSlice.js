import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Products in store
 */
const storeSlice = createSlice({
    name: 'store',

    initialState: {
        items: [],      // list of products in store
        /**
         * Array of : {
         *      - id : <int>
         *      - title : <string>
         *      - price : <float>
         *      - description : <string>
         *      - category : <string>
         *      - image : <string>
         *      - rating : <Object> { (unused)
         *          - rate : <float>
         *          - count : <int>
         *        }
         *  }
         */
        loading: false, // are products currently being queried from API?
        error: '',      // error message in case API call failed
        /* we actually created these two properties in order to handle errors in products loading, but never implemented their usage ^^
             in all components where store products are needed, we only assess 'items.length' and assume that it's loading if empty.
             Which means that we do not display any error when caught, the loaders just spin indefinitely */
    },
    reducers: {
        
    },
    extraReducers: (builder) => {

        /* async get store products */
        builder.addCase(getItems.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getItems.fulfilled, (state, action) => {
            state.items = [...action.payload];
            state.loading = false;
            state.error = false;
        });

    }
});

/**
 * Get store products from 'https://fakestoreapi.com/products'
 */
export const getItems = createAsyncThunk(
    'getItems',
    async () => {

        await new Promise(res => setTimeout(res, 3000)); // enjoy the loader!

        /* const res = await fetch('https://fakestoreapi.com/products', {
            method: 'Get'
        }); */
        const res = await fetch(import.meta.env.VITE_SERVER_URL + '/products', {
            method: 'Get'
        });

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);

export default storeSlice.reducer;

/*export const {
    
} = storeSlice.actions;*/