import { useContext, useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

import '../assets/register.scss';
import { AuthContext } from "../context/AuthProvider";

const Register = () => {

    // X_o
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const { user, register, loading, errorMsg, setErrorMsg } = useContext(AuthContext); // to get user & dispatch user actions

    /* sanity check */
    if (user)
        return <Navigate to='/' /> /* get out of here you dirty logged user! */

    const form_initial_state = {                                                        // register form initial input values
        username: '',
        username_input: false,  // ('<name>_input == false' means unchanged yet)
        password: '',
        password_input: false,
        firstname: '',
        firstname_input: false,
        lastname: '',
        lastname_input: false,
        email: '',
        email_input: false,
    }
    const [formData, setFormData] = useState(form_initial_state);                       // register form input values
    const [formValid, setFormValid] = useState(false);                                  // register form valid state


    /* register form inputs control */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            [name + '_input']: true,
        });
    }

    /* on form data change ==> assess form valid state
         (I would have preferred to put this in 'handleChange', but it doesn't work..) */
    useEffect(() => {
        setFormValid( ! (formData.username.trim() === '' || formData.password.trim() === '' || formData.firstname.trim() === '' || formData.lastname.trim() === '' || !formData.email.match(EMAIL_REGEX)) );
    }, [formData])

    /* register (on form submit) */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* sanity check */
        if (!formValid)
            return;

        /* register */
        await register({
            username: formData.username,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
        });

        /* reset password (will not be reached unless register failed) */
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
            <form id="register" onSubmit={handleSubmit}>

                {/* header */}
                <h2 className="header">Register</h2>


                {/* login inputs */}
                <h3 className="subheader">Login Information</h3>

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


                {/* account details inputs */}
                <h3 className="subheader">Personal Information</h3>

                <input
                    id="input-firstname" name="firstname"
                    type="text"
                    placeholder="Your first name"
                    value={formData.firstname}
                    onChange={handleChange}
                    style={!formData.firstname_input ? {} : formData.firstname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.firstname_input && formData.firstname.trim() === '') && <p className="error">no you don't</p>
                }

                <input
                    id="input-lastname" name="lastname"
                    type="text"
                    placeholder="Your last name"
                    value={formData.lastname}
                    onChange={handleChange}
                    style={!formData.lastname_input ? {} : formData.lastname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.lastname_input && formData.lastname.trim() === '') && <p className="error">no you don't</p>
                }

                <input
                    id="input-email" name="email"
                    type="text"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={!formData.email_input ? {} : !formData.email.match(EMAIL_REGEX) ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.email_input && !formData.email.match(EMAIL_REGEX)) && <p className="error">no you don't</p>
                }


                {/* CTA */}
                <button type="submit" className={(loading || !formValid) ? "disabled" : ""}>
                    <div className="loader-wrapper-btn">
                        <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                    </div>
                    Register
                </button>
                {
                    (errorMsg !== '') && <p className="error">{errorMsg}</p>
                }

            </form>
        </>
    );
};

export default Register;