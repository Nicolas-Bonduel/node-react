import { useEffect, useState } from "react";


/**
 * Hook for getting & toggling theme
 */
function useTheme() {

    const [darkTheme, setDarkTheme] = useState(localStorage.getItem('theme-dark') && localStorage.getItem('theme-dark') === 'true');  // to manage theme (duh)


    /* theme toggler */
    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    }


    /* on theme change ==> change theme (no way!) */
    useEffect(() => {
        // store theme in local storage (to restore it on refresh)
        localStorage.setItem('theme-dark', darkTheme ? 'true' : 'false');
    }, [darkTheme]);
    

    return { darkTheme, toggleTheme }
}

export default useTheme
