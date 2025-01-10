import { useContext, useEffect, useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

import '../assets/login.scss'


const Login = () => {

    const { user, login, loading, errorMsg, setErrorMsg } = useContext(AuthContext);    // to get user & dispatch user actions

    /* sanity check */
    if (user)
        return <Navigate to='/' /> /* get out of here you dirty logged user! */

    const form_initial_state = {                                                        // login form initial input values
        username: '',
        username_input: false,  // ('<name>_input == false' means unchanged yet)
        password: '',
        password_input: false,
    }
    const [formData, setFormData] = useState(form_initial_state);                       // login form input values


    /* login form inputs control */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            [name + '_input']: true,
        });
    }

    
    /* login (on form submit) */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* sanity check */
        if (formData.username.trim() === '' || formData.password.trim() === '')
            return;

        /* login */
        await login({
            username: formData.username,
            password: formData.password,
        });

        /* reset password (will not be reached unless login failed) */
        setFormData({
            ...formData,
            password: '',
            password_input: false,
        });
    };


    /* on load ==> reset error message (avoids persisting message accross navigation) */
    useEffect(() => {
        setErrorMsg('');
    }, []);


    return (
        <>
            <form id="login" onSubmit={handleSubmit}>

                {/* header */}
                <h2 className="header">Login</h2>

                {/* inputs */}
                <input
                    id="input-username" name="username"
                    type="text"
                    placeholder="Your username"
                    value={formData.username}
                    onChange={handleChange}
                    style={!formData.username_input ? {} : formData.username.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.username_input && formData.username.trim() === '') && <p className="error">no you don't</p>
                }

                <input
                    id="input-password" name="password"
                    type="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange}
                    style={!formData.password_input ? {} : formData.password.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.password_input && formData.password.trim() === '') && <p className="error">no you don't</p>
                }

                {/* CTA */}
                <button type="submit" className={loading || (formData.username.trim() === '' || formData.password.trim() === '') ? "disabled" : ""}>
                    <div className="loader-wrapper-btn">
                        <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                    </div>
                    Login
                </button>
                {
                    (errorMsg !== '') && <p className="error">{errorMsg}</p>
                }

                {/* register link */}
                <span className="register-section">
                    Don't have an account ? <NavLink to="/register">Register</NavLink>
                </span>

            </form>
        </>
    );
};

export default Login;