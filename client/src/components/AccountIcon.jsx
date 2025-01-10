
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

import account_icon from '../assets/images/account-icon.png'


/**
 * Account Icon (located in header)
 */
function AccountIcon() {

    const auth = useContext(AuthContext);


    return (
        <>
            {
                auth.user ?
                    /* logged in */
                    <>
                        <NavLink to="/user" className="account">

                            <img alt="my account" src={account_icon} /> {/* hope you like the image, we took great care in choosing it */}

                            <span>{auth.user.firstname} {auth.user.lastname}</span>

                        </NavLink>
                    </>
                    :
                    /* not logged in */
                    <>
                        <NavLink to="/login" className="account-login">Login</NavLink>
                    </>
            }
        </>
    )

}

export default AccountIcon;