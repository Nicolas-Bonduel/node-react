import { useState } from "react";


/**
 * Hook for the QtyBox component (see QtyBox for details)
 */
function useQty(qty_ini = 1) {

    const [qty, setQty] = useState(qty_ini);            // to control quantity input (for displaying validation errors)
    const [validQty, setValidQty] = useState(true);     // is input quantity valid (shortcut for avoiding all assessments)
    

    /* quantity input control */
    const handleQty = (qty) => {
        setQty(qty);
        setValidQty(true);

        if (!parseInt(qty))
            setValidQty(false);
        if (Number(qty) != qty || Number(qty) % 1)
            setValidQty(false);
        if (parseInt(qty) < 1)
            setValidQty(false);
        if (parseInt(qty) > 99)
            setValidQty(false);
    }


    return { qty, validQty, handleQty }
}

export default useQty
