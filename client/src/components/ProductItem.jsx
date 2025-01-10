import { useEffect, useRef, useState } from "react"

import useQty from "../hooks/useQty"
import QtyBox from "./QtyBox"
import useAddCart from "../hooks/useAddCart"
import AddCart from "./AddCart"

import '../assets/product.scss'


/**
 * Store Product Item (used in Product)
 */
function ProductItem({ item }) {

    const { qty, validQty, handleQty } = useQty();                          // to use QtyBox component

    const { handleAddCart, loading } = useAddCart(item, qty, validQty);     // to use AddCart component

    const contentRef = useRef(null);                                        // to resize picture to fit its neighbor height
    const pictureWrapperRef = useRef(null);                                 // to resize picture to fit its neighbor height


    /* on load ==> resize picture to fit its neighbor height
        listen, I struggled for more time than I'd like to admit to resolve this issue in pure css, but I miserably failed ><
        so here you go, good old js one-liner to compensate for my incompetence... */
    useEffect(() => {
        pictureWrapperRef.current.style.height = `${contentRef.current.offsetHeight}px`;
    }, []);


    return (
        <>
            <div className="product-item-wrapper">

                <span ref={pictureWrapperRef} className="picture-wrapper">
                    <img className="picture" alt="picture" src={item.image} />
                </span>

                <div ref={contentRef} className="column">
                    <span className="title">{item.title}</span>
                    <span className="category">{item.category}</span>
                    <span className="description">{item.description}</span>
                    <span className="price">{item.price.toFixed(2).toString().replace('.', ',')} $</span>
                    <p className="qty-label">Quantité :</p>
                    <QtyBox qty={qty} validQty={validQty} handleQty={handleQty}/>
                    <AddCart handleAddCart={handleAddCart} loading={loading} validQty={validQty} />
                </div>

            </div>
        </>
    )
}

export default ProductItem
