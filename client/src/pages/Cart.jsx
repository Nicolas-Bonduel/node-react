import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthContext } from "../context/AuthProvider"
import { destroy } from "../store/slice/cartSlice"

import CartItem from "../components/CartItem"

import '../assets/cart.scss'
import { useNavigate } from "react-router-dom"


const Cart = () => {

    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.items);                             // to display cart items (duh)
    const store_items = useSelector((state) => state.store.items);                          // to find missing properties in cart items

    const cartItems_amount = cartItems                                                      // to display amount of products in cart
        .reduce((total, item) => parseInt(total + item.qty), 0);
    const subtotal = cartItems.reduce((total, item) => {                                    // to display total price
        return total + ((store_items.find(i => i.id == item.id)?.price ?? 0) * item.qty);
    }, 0);

    const dispatch = useDispatch();                                                         // to dispatch cart actions
    const navigate = useNavigate();


    /* empties cart (on button click) */
    const handleDestroy = () => {
        dispatch(destroy());
    };

    /* purchases cart (on button click) */
    const handlePurchase = async() => {
        const data = cartItems.map(i => { return { product_id: i.id, qty: i.qty } });

        let status;
        const res = await fetch(import.meta.env.VITE_SERVER_URL + '/purchase', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })
            .then(res => { status = res.status; return res; })
            .then(res => res.json())
            .then(res => {
            if (status === 200) {
                dispatch(destroy());
                navigate("/user");
            }
            else {
                // TODO error handling
            }
            })
            /*.catch(res => );*/ // TODO error handling
    };


    return (
        <div className="cart">

            {user && <h2>Hi {user.firstname ?? ''} {user.lastname ?? ''}!</h2>}

            {
                cartItems.length === 0 ?

                    /* cart empty */
                    <>
                        {/* TODO you can do better than this */}
                        <p>Votre panier est vide</p>
                    </>

                    :

                    /* cart not empty */
                    < div className="split">
                        {/* cart might not be empty but store products might! (store products take some time to retrieve
                              so you might have to wait if you reload this page or access it directly)
                            we could have displayed only this in this case, but we kinda weirdly decided to still display
                              everything with placeholders when values are not yet available, and it actually doesn't look too bad imo*/}
                        {!store_items.length && <div className="loader-wrapper"><span className="loader"></span></div>}

                        {/* cart header & actions */}
                        <div className="border">
                            <p>There are {cartItems_amount} items in your basket</p>
                            <button className="button-cart" onClick={handleDestroy}>Empty cart</button>
                        </div>

                        {/* cart content */}
                        <ul>
                            {cartItems.map((item, idx) => <CartItem key={idx} item={item} />)}
                        </ul>

                        {/* total */}
                        <div className="subtotal">
                            <p>Total: ${subtotal.toFixed(2).toString().replace('.', ',')}</p>
                        </div>

                        {/* CTA */}
                        <button className="button-cart float-right" onClick={handlePurchase}>Purchase</button>
                    </ div >
            }

        </div>
    );

}
export default Cart;
