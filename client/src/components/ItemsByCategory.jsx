import { useSelector } from "react-redux"

import ItemCard from "./ItemCard"


/**
 * Filtered Store Items (by given category) (used in Home and in ProductItem)
 * 'ignore' param can be set to a store item id if we want to ignore it,
 *   this is useful in excluding browsed product in ProductItem related products (i.e.: same category)
 */
function ItemsByCategory({category, ignore = -1}) {

    const items = useSelector(state => state.store.items);                      // to display filtered store items
    const itemsByCategory = items.filter(item => item.category === category);   // to display filtered store items

    
    return (
        <>
            <div className="items-wrapper">

                {
                    itemsByCategory.map((item, idx) => (ignore === -1 || item.id != ignore) && <ItemCard key={idx} item={item} />)
                }

            </div>
        </>
    )

}

export default ItemsByCategory;