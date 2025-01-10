import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { delete_, updateQuantity } from "../store/slice/cartSlice"

import useQty from "../hooks/useQty"
import QtyBox from "./QtyBox"

import image_placeholder from '../assets/images/img-placeholder.png'

import '../assets/cart.scss'


/**
 * Cart Item (located in cart, NOT in minicart)
 */
const CartItem = ({ item }) => {

    const items = useSelector((state) => state.store.items);                            // to retrieve item properties that are missing in cart item
    const store_item = items.find(item_ => item_.id == item.id);                        // to retrieve item properties that are missing in cart item

    const { qty, validQty, handleQty } = useQty(item.qty);                              // to use QtyBox component

    const totalItemPrice                                                                // to display item subtotal
        = ((store_item?.price ?? 0) * qty).toFixed(2).toString().replace('.', ',');

    const dispatch = useDispatch();                                                     // to dispatch cart actions

    const contentRef = useRef(null);                                                    // to resize picture to fit its neighbor height
    const pictureWrapperRef = useRef(null);                                             // to resize picture to fit its neighbor height


    /* remove item from cart (on button click) */
    const handleDelete = () => {
        dispatch(delete_({ id: item.id }));
    };


    /* on quantity change ==> update cart quantity */
    useEffect(() => {
        if (validQty)
            dispatch(updateQuantity({ id: item.id, qty }));
    }, [qty]);

    /* on load ==> resize picture to fit its neighbor height
        listen, I struggled for more time than I'd like to admit to resolve this issue in pure css, but I miserably failed ><
        so here you go, good old js one-liner to compensate for my incompetence... */
        useEffect(() => {
            pictureWrapperRef.current.style.height = `${contentRef.current.offsetHeight}px`;
        }, []);


    return (
        <>
            <div className="flex items split">

                {/* there is a lot of 'store_item?.<property> ?? <something>' because user might refresh the page,
                      thus trigerring a products refresh
                      since this takes some time, user will still be able to see his cart with placeholders and an
                      overlapping loader untill products are loaded (displayed in parent Cart component) */}

                <span ref={pictureWrapperRef} className="picture-wrapper">
                    <img className="img-cart" src={store_item?.image ?? image_placeholder} />
                </span>

                <div ref={contentRef}>

                    <NavLink to={'/product/' + item.id} className="title">title: {store_item?.title ?? ''}</NavLink>
                    <p className="category">category: {store_item?.category ?? ''}</p>
                    <p className="description">desc: {store_item?.description ?? ''}</p>

                    <div className="flex">

                        <div className="flex info-item">
                            <p className="price">{(store_item?.price ?? 0).toFixed(2).toString().replace('.', ',')} $</p>
                            <p className="qty-label">Quantity:</p>
                            <QtyBox qty={qty} validQty={validQty} handleQty={handleQty} />
                            <button onClick={handleDelete} className="button-cart">Remove Item</button>
                        </div>

                        <div className="total-item-position">
                            <div className="price">Total item: <span className="price">{totalItemPrice} $</span></div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default CartItem
