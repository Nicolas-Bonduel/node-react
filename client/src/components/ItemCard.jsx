import { NavLink } from "react-router-dom"

import useQty from "../hooks/useQty"
import QtyBox from "./QtyBox"
import useAddCart from "../hooks/useAddCart"
import AddCart from "./AddCart"


/**
 * Store Item Card (used in ItemsByCategory)
 */
function ItemCard({ item }) {

    const { qty, validQty, handleQty } = useQty();                      // to use QtyBox component
    
    const { handleAddCart, loading } = useAddCart(item, qty, validQty); // to use AddCart component

    
    return (
        <>
            <div className="item-card">

                <NavLink to={"/product/" + item.id} className="picture">
                    <img alt="picture" src={item.image} />
                </NavLink>

                <div className="padded">
                    <NavLink to={"/product/" + item.id} className="title">{item.title}</NavLink>
                    <p className="description">{item.description}</p>
                    <span className="price">{item.price.toFixed(2).toString().replace('.', ',')} $</span>
                    <QtyBox qty={qty} validQty={validQty} handleQty={handleQty}/>
                    <AddCart handleAddCart={handleAddCart} loading={loading} validQty={validQty} />
                </div>

            </div>
        </>
    )

}

export default ItemCard