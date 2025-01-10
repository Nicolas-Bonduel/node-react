import { NavLink } from "react-router-dom"

import Navbar from "./Navbar"
import Theme from "./Theme"
import AccountIcon from "./AccountIcon"
import Minicart from "./Minicart"

import header_logo from '../assets/images/logo_black.png'

import '../assets/header.scss'


/**
 * Header (what do you want me to say, it's a header)
 */
function Header() {


    return (
        <>
            <header>

                <NavLink to={'/'} className="logo-link">
                    <img className="logo" alt="header logo" src={header_logo} />
                </NavLink>

                <Navbar />

                <Theme />

                <AccountIcon />

                <Minicart />

            </header>
        </>
    )

}

export default Header;