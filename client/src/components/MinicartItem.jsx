import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { delete_ } from "../store/slice/cartSlice"

import close_icon from '../assets/images/close-icon.png';
import image_placeholder from '../assets/images/img-placeholder.png';


/**
 * Minicart Item (used in Minicart)
 */
function MinicartItem({ item }) {

    const items = useSelector((state) => state.store.items);        // to retrieve missing properties in cart item
    const store_item = items.find(item_ => item_.id == item.id);    // to retrieve missing properties in cart item

    const dispatch = useDispatch();


    /* removes item from cart (on button click) */
    const handleDelete = () => {
        dispatch(delete_({
            id: item.id,
        }));
    }


    return (
        <>
            <div className="item-wrapper">

                {/* there is a lot of 'store_item?.<property> ?? <something>' because user might refresh the page,
                      thus trigerring a products refresh
                      since this takes some time, user will still be able to see his minicart with placeholders and an
                      overlapping loader untill products are loaded (displayed in parent Minicart component) */}

                <NavLink to={"/product/" + item.id} className="picture-wrapper">
                    <img className="picture" alt="picture" src={store_item?.image ?? image_placeholder} />
                </NavLink>

                <div className="column">
                    <NavLink to={"/product/" + item.id} className="title">{store_item?.title ?? ''}</NavLink>
                    <div className="row">
                        <span className="amount-price">{item.qty} x {(store_item?.price ?? 0).toFixed(2).toString().replace('.', ',')} $</span>
                        <button className="delete" onClick={handleDelete}>
                            <img alt="delete" src={close_icon} />
                        </button>
                    </div>
                </div>

            </div>
        </>
    )

}

export default MinicartItem;