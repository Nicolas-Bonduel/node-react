import { useContext, useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

import '../assets/user.scss'


const User = () => {

    // O_x ~~
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { user, logout, editAccount, editAccountMsg } = useContext(AuthContext);  // to get user & dispatch user actions
    const [inputs, setInputs] = useState({                                          // account details input values
        firstname: user?.firstname ?? '',
        firstname_ini: true, // ('<name>_ini == true' means unchanged yet)
        lastname: user?.lastname ?? '',
        lastname_ini: true,
        email: user?.email ?? '',
        email_ini: true,
    });
    const [lastEditAccountMsg, setLastEditAccountMsg] = useState(editAccountMsg);   // to display a toast message on account edit
    const [timeoutId, setTimeoutId] = useState(0);                                  // to allow toast message fading
    const notifier_ref = useRef(null);                                              // to allow toast message fading
    const [orders, setOrders] = useState([]);


    /* sanity check */
    if (!user)
        return <Navigate to='/' /> /* get out of here you dirty unlogged user! */

    
    /* inputs control */
    const handleChange = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value,
            [name + '_ini']: false,
        });
    }

    /* edit account details (on button click) */
    const handleEdit = () => {

        if (inputs.firstname.trim() === '' || inputs.lastname.trim() === '' || !inputs.email.match(EMAIL_REGEX))
            return;

        editAccount({
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            email: inputs.email,
        });
    };
    

    /* on edit account ==> display toast notifier */
    useEffect(() => {

        /* toast appears instantly (unless a previous toast was fading-out) */
        if (editAccountMsg.type && editAccountMsg.msg) {
            setLastEditAccountMsg(editAccountMsg);
            notifier_ref.current.style.opacity = 1;
            // clears previous fading-out effect (if any)
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(0);
            }
        }
        /* toast disappears gradually */
        else {
            notifier_ref.current.style.opacity = 0; // (there's a .8s css transition on this)
            let timeoutId_ = setTimeout(() => {
                if (!notifier_ref.current) // avoids trigerring an error when navigated to another page (since element won't be accessible anymore)
                    return; 

                setLastEditAccountMsg(editAccountMsg); // updates message (empties it, actually)
                notifier_ref.current.style.opacity = 1; // reset style
            }, 1000);
            setTimeoutId(timeoutId_);
        }

    }, [editAccountMsg]);

    /* on load ==> retrives user orders */
    useEffect(() => {
        async function getOrders() {
            let status;
            const res = await fetch(import.meta.env.VITE_SERVER_URL + '/orders', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })
                .then(res => { status = res.status; return res; })
                .then(res => res.json())
                .then(res => {
                if (status === 200) {
                    setOrders(res);
                }
                else {
                    // TODO error handling
                }
                })
                /*.catch(res => );*/ // TODO error handling
        };
        getOrders();
    }, []);


    return (
        <>
            <div id="user-page">

                {/* account section */}
                <div className="account">
                    {/* header */}
                    <h2>
                        Hey there, {user?.firstname ?? ''} {user?.lastname ?? ''} !
                        <button className="logout" onClick={logout}>Logout</button>
                    </h2>

                    <p className="describ">Customize your profile here</p>

                    {/* inputs */}
                    <div className="flex">
                        <span>Your first name :</span>
                        <input type="text" value={inputs.firstname} onChange={(e) => handleChange('firstname', e.target.value)}
                            style={inputs.firstname_ini ? {} : inputs.firstname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                        />
                    </div>

                    <div className="flex">
                        <span>Your last name :  </span>
                        <input type="text" value={inputs.lastname} onChange={(e) => handleChange('lastname', e.target.value)}
                            style={inputs.lastname_ini ? {} : inputs.lastname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                        />
                    </div>

                    <div className="flex">
                        <span>Your email : </span>
                        <input type="email" value={inputs.email} onChange={(e) => handleChange('email', e.target.value)}
                            style={inputs.email_ini ? {} : !inputs.email.match(EMAIL_REGEX) ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                        />
                    </div>

                    {/* CTA */}
                    <button onClick={handleEdit} className={(inputs.firstname.trim() === '' || inputs.lastname.trim() === '' || !inputs.email.match(EMAIL_REGEX)) ? "button-save disabled" : "button-save"}>save</button>

                    {/* toast notifier */}
                    <span
                        ref={notifier_ref}
                        style={(lastEditAccountMsg.type && lastEditAccountMsg.msg) ? {} : { 'display': 'none' }}
                        className={(lastEditAccountMsg.type && lastEditAccountMsg.msg) ? `notifier ${lastEditAccountMsg.type}` : "notifier"}>
                        {lastEditAccountMsg.msg}
                    </span>
                </div>

                {
                    !orders.length ?

                        <></>

                        :

                        /* purchases section */
                        <div className="purchases">

                            {/* header */}
                            <p className="describ">Your purchases</p>

                            {/* table */}
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, idx) => 
                                                <tr key={idx}>
                                                    <th scope="row"><a href="">#{order.id}</a></th>
                                                    <td>{new Date(order.date).toLocaleString()}</td>
                                                    <td>{order.total} €</td>
                                                    <td>completed</td>
                                                    <td>
                                                        <a className="btn" href="">See</a>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                }

            </div>
        </>
    );
};
export default User;