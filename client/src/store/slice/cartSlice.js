import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * Cart
 */
const cartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: [],      // list of items in cart
        /**
         * Array of : {
         *      - id : <int>
         *      - qty : <int>
         *  }
         */
        loadingFor: -1, // item id currently being added to cart (to display a loader on the add button, -1 if none)
        /* yes this should be a list since user could be adding multiple different items to cart simultaneously, I know.. */
    },
    reducers: {

        /* add to cart
             this is actually never used since we only add items to cart asynchronously,
               but it's here if you wish to add them synchronously
             note that we do not perform any other action asynchronously, only adding items is async
               technically every action should be async but we didn't bother, blame our lazyness! */
        add(state, action) {
            let idx = state.items.findIndex(i => i.id === action.payload.id);
            if (idx === -1) // new item ==> add to cart
                state.items.push({
                    id: action.payload.id,
                    qty: action.payload.qty ?? 1,
                });
            else // already in cart ==> increment qty
                state.items[idx].qty += action.payload.qty;

            // store cart
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },

        /* update cart item quantity
             (used by the quantity inputs in cart page)
         */
        updateQuantity(state, action) {
            const { id, qty } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.qty = qty;
            }

            // store cart
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },

        /* remove item from cart (yes this should have been called 'remove', I know..) */
        delete_(state, action) {
            let idx = state.items.findIndex(i => i.id === action.payload.id);
            if (idx !== -1)
                state.items.splice(idx, 1);

            // store/delete cart (delete if empty)
            if (state.items.length)
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            else
                localStorage.removeItem('cartItems');
        },

        /* destroy cart */
        destroy(state, action) {
            state.items = [];

            // delete stored cart
            localStorage.removeItem('cartItems');
        },

        /* restore cart (called on init to retrieve user cart items from storage) */
        restore(state, action) {
            let cartItems = localStorage.getItem('cartItems');
            if (cartItems)
                state.items = JSON.parse(cartItems);
        },

    },
    extraReducers: (builder) => {

        /* async add to cart */
        builder.addCase(addAsync.pending, (state, action) => {
            state.loadingFor = action.meta.arg.id;
        })
        .addCase(addAsync.rejected, (state, action) => {
            state.loadingFor = -1;
        })
        .addCase(addAsync.fulfilled, (state, action) => {
            let idx = state.items.findIndex(i => i.id === action.payload.id);
            if (idx === -1) // new item ==> add to cart
                state.items.push({
                    id: action.payload.id,
                    qty: action.payload.qty ?? 1,
                });
            else // already in cart ==> increment qty
                state.items[idx].qty += action.payload.qty;

            state.loadingFor = -1;

            // store cart
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        });

    }
});


/**
 * Add item to cart
 */
export const addAsync = createAsyncThunk(
    'addAsync',
    async ({ id, qty }) => {
        await new Promise(res => setTimeout(res, 2000)); // enjoy the loader!

        return { id, qty };
    }
);


export default cartSlice.reducer;

export const {
    add,
    delete_,
    updateQuantity,
    destroy,
    restore,
} = cartSlice.actions;