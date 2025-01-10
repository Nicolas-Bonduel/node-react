
/**
 * Quantity Box Input (used in ItemCard & ProductItem)
 * Goes with useQty hook to provide 'qty', 'validQty' & 'handleQty' objects definition
 * 
 * How to implement :
 *  function YourComponent() {
 * 
 *      const { qty, validQty, handleQty } = useQty();
 * 
 *      return (
 *          <>
 *              <something..>
 * 
 *              <QtyBox qty={qty} validQty={validQty} handleQty={handleQty}/>
 * 
 *              <something..>
 *          </>
 *      )
 *  }
 * 
 * usually goes with an AddCart component, which is the reason why we did not implement the logic here but used a hook instead,
 *   since AddCart requires 'qty' and 'validQty' states to operate.
 */
function QtyBox({ qty, validQty, handleQty }) {


    return (
        <>
            <div className={validQty ? "qty-box" : "qty-box is-invalid"}>

                <span className="qty-decrease" onClick={() => handleQty(parseInt(qty) - 1)}>-</span>

                <input className="qty" type="number" value={qty} onChange={e => handleQty(e.target.value)} />
                {/* we do not parse the value to an integer because we would rather show an error than transforming the input
                      without notice (e.g.: user typed '1.2', I'd rather show him that it's stupid rather than saying 'ok'
                      but taking 1 as value) */}

                <span className="qty-increase" onClick={() => handleQty(parseInt(qty) + 1)}>+</span>

            </div>
        </>
    )
}

export default QtyBox
