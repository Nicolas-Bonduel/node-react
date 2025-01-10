import { useDispatch, useSelector } from "react-redux";
import { addAsync } from "../store/slice/cartSlice";


/**
 * Hook for the AddCart component (see AddCart for details)
 */
function useAddCart(item, qty, validQty) {

    const loadingFor = useSelector((state) => state.cart.loadingFor);   // to display loader
    const loading = loadingFor == item.id;                              // to display loader

    const dispatch = useDispatch();


    /* add item to cart (on button click) */
    const handleAddCart = () => {
        if (!validQty) // don't add an invalid quantity
            return;
        if (loading) // don't queue async calls (we could, but I don't wanna :p)
            return;

        dispatch(addAsync({
            id: item.id,
            qty: qty,
        }));
    }


    return { handleAddCart, loading }
}

export default useAddCart
