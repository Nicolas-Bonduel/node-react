/**
 * Add To Cart Button (used in ItemCard & ProductItem)
 * Goes with useAddCart hook to provide 'handleAddCart' & 'loading' objects definition
 * Always goes with a QtyBox component, along with its corresponding useQty hook
 * Always needs an 'item' prop (i.e.: product / store item)
 * 
 * How to implement :
 *  function YourComponent() {
 * 
 *      const { qty, validQty, handleQty } = useQty();
 * 
 *      const { handleAddCart, loading } = useAddCart(item, qty, validQty); // needs an item, retrieve it however you want
 * 
 *      return (
 *          <>
 *              <something..>
 * 
 *              <QtyBox qty={qty} validQty={validQty} handleQty={handleQty}/>
 * 
 *              <AddCart handleAddCart={handleAddCart} loading={loading} validQty={validQty} />
 * 
 *              <something..>
 *          </>
 *      )
 *  }
 */
function AddCart({ handleAddCart, loading, validQty }) {


    return (
        <>
            <button className={validQty && !loading ? "add-to-cart-btn" : "add-to-cart-btn disabled"} onClick={handleAddCart}>

                Add to cart

                <div className="loader-wrapper-btn"> {/* enjoy the loader! */}
                    <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                </div>

            </button>
        </>
    )
}

export default AddCart
