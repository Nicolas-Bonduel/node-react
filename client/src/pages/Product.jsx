import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import ProductItem from "../components/ProductItem"
import ItemsByCategory from "../components/ItemsByCategory"

import '../assets/products.scss'


function Product() {

  const { id } = useParams();                               // to retrieve product from route params

  const items = useSelector((state) => state.store.items);  // to find product in store items
  const item = items.find(i => i.id == id);                 // I found it, it's here!


  return (
    <>
      {
        !items.length ?

          /* loading (yeeah, it might have failed but you'll never know coz we're too lazy ~~) */
          <div className="loader-wrapper">
            <span className="loader"></span>
          </div>

          :

          /* loaded */
          <>
            {/* display product (did I seriously have to comment this? x_x) */}
            <div id='product-item'>

              <ProductItem item={item} />

            </div>

            {/* display related products (i.e.: products in same category, except this one obviously)
                  the product alone in a page kinda stressed me out, so I added a related products section to fill the space */}
            <div className="related-products">

              <h2 className="category-header">You might also like</h2>

              <ItemsByCategory category={item.category} ignore={item.id} />

            </div>
          </>
      }

    </>
  )
  
}

export default Product
