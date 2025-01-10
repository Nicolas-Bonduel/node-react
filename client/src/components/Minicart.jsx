import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import MinicartItem from "./MinicartItem"

import cart_icon from '../assets/images/cart-icon_black.png'


/**
 * Minicart (located in header)
 */
function Minicart() {

    const cartItems = useSelector((state) => state.cart.items);                             // to display cart items (duh)
    const store_items = useSelector((state) => state.store.items);                          // to retrieve missing properties in cart item

    const cartItems_amount = cartItems                                                      // to display amount of products in cart
    .reduce((total, item) => parseInt(total + item.qty), 0);

    const subtotal = cartItems.reduce((total, item) => {                                    // to display subtotal
        return total + ((store_items.find(i => i.id == item.id)?.price ?? 0) * item.qty);
    }, 0);

    const [minicartVisible, setMinicartVisible] = useState(false);                          // to show/hide minicart
    const minicart_btn_ref = useRef(null);                                                  // to show/hide minicart
    const minicart_ref = useRef(null);                                                      // to show/hide minicart

    /* on click ==> hide minicart if clicked elsewhere (yep, good old js) */
    document.addEventListener('mousedown', function (event) {
        if (minicart_btn_ref.current && !minicart_btn_ref.current.contains(event.target) && minicart_ref.current && !minicart_ref.current.contains(event.target))
            setMinicartVisible(false);
    });

    const navigate = useNavigate();


    return (
        <>

            <button ref={minicart_btn_ref} id="minicart-btn" onClick={() => setMinicartVisible(!minicartVisible)}>
                <img className="minicart-icon" alt="my cart" src={cart_icon} />
                <span className="cart-count">{cartItems_amount > 99 ? '99+' : cartItems_amount}</span>
            </button>

            <div ref={minicart_ref} id="minicart" style={{ 'right': minicartVisible ? '0' : '-25%' }}>

                <button className="close-button" onClick={() => setMinicartVisible(false)}>X</button>

                <div className="content">
                    {
                        !cartItems.length ?

                            /* cart is empty */
                            <p className="cart-is-empty">Votre panier est vide</p>

                            :

                            /* cart is not empty */
                            <>
                                {/* displays an overlapping loader if products are loading, happens most often on page refresh */}
                                {!store_items.length && <div className="loader-wrapper"><span className="loader"></span></div>}

                                {cartItems.map((item, idx) => <MinicartItem key={idx} item={item} />)}

                                <span className="subtotal">
                                    Subtotal : {subtotal.toFixed(2).toString().replace('.', ',')} $
                                </span>

                                <button className="view-cart-btn" onClick={() => { navigate('cart'); setMinicartVisible(false)}}>
                                    My cart
                                </button>
                            </>
                    }

                </div>

            </div>

        </>
    )

}

export default Minicart;