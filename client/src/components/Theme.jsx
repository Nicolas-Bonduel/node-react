import React, { useContext } from "react"
import { ThemeContext } from "../context/ThemeProvider"

import theme_icon from '../assets/images/theme-icon_dark.png'


/**
 * Theme (located in header)
 */
function Theme() {

    const { toggleTheme } = useContext(ThemeContext);


    return (
        <>
            <div className="theme-option" onClick={toggleTheme}>

                <span>Theme</span>

                <img className="theme-icon" alt="theme option" src={theme_icon} />

            </div>
        </>
    )

}

export default Theme;