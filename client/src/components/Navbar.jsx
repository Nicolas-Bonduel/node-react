import {NavLink} from "react-router-dom";


/**
 * Navbar (located in header)
 */
function Navbar() {

    
    return (
        <>
            {/* yeah there is only one link, kind of sad but meh, whatever */}
            <nav>
                <NavLink to={'/'} className="home-link">Home</NavLink>
            </nav>
        </>
    )

}

export default Navbar;