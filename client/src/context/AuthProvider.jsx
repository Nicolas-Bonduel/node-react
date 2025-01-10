import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


/**
 * Authentication Context Provider
 */
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);                                           // user object
  /**
   * user : {
   *  - username : <string>
   *  - password : <string>
   *  - firstname : <string>
   *  - lastname : <string>
   *  - email : <string>
   * }
   *  note: there might be other properties that we never bothered to clean up
   */
  const [loading, setLoading] = useState(false);                                    // currently logging in or registering notifier
  const [errorMsg, setErrorMsg] = useState('');                                     // logging or registering error
  const [editAccountMsg, setEditAccountMessage] = useState({ type: '', msg: '' });  // edit account esponse message
  const navigate = useNavigate();                                                   // allows redirection


  /**
   * Registers a new user
   */
  const register = async ({ username, password, firstname, lastname, email }) => {
    setLoading(true);
    setErrorMsg('');

    const user = { username, password, firstname, lastname, email };

    await new Promise(res => setTimeout(res, 1000)); // enjoy the loader!

    /* registering from server */
      let status;
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) { // registering suceeded ==> user was returned (might have some extra unused properties)
            // logging-in new user
            setUser(res.user);
            localStorage.setItem('logged_user', JSON.stringify(res.user)); // store user to restore login on refresh
          }
          else { // registering failed
            if (status === 400) // error 400 means we trigerred it and sent a custom message back
              setErrorMsg(res.message);
            else // any other error code is not trigerred by us so no custom message sent
              setErrorMsg(res.statusText);
          }
        })
        .catch(res => setErrorMsg('An unexpected error was caught!'));

    setLoading(false);

  }


  /**
   * Logs a user in
   */
  const login = async ({ username, password }) => {
    setLoading(true);
    setErrorMsg('');

    await new Promise(res => setTimeout(res, 1000)); // enjoy the loader!

    /* logging-in from server */
      let status;
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) { // login suceeded ==> user was returned (might have some extra unused properties)
            // logging-in
            setUser(res.user);
            localStorage.setItem('logged_user', JSON.stringify(res.user)); // store user to restore login on refresh
          }
          else { // login failed
            if (status === 400) // error 400 means we trigerred it and sent a custom message back
              setErrorMsg(res.message);
            else
              setErrorMsg(res.statusText); // any other error code is not trigerred by us so no custom message sent
          }
        })
        .catch(res => setErrorMsg('An unexpected error was caught!'));

    setLoading(false);

  }


  /**
   * Restores login from local storage data
   *   why local storage? because I don't know how to use session
   *   why even bother with local storage when we have jwt? I dunno, leave me alone !
   *   :(
   * This is called on refresh to avoid the user from loosing his login state
   */
  const restore_login = async (user) => {

    /* restoring login from server */
      let status;
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/relogin', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) // login suceeded ==> user was returned (might have some extra unused properties)
            setUser(res.user)
          else { // login failed (no need for a specific error message)
            // logging-out (not very useful since user will be null on refresh, but whatever)
            setUser(null);
            localStorage.removeItem('logged_user'); // remove stored user
          }
        })
        .catch(res => {
          setUser(null);
          localStorage.removeItem('logged_user');
        });

  }


  /**
   * Logs a user out
   */
  const logout = async () => {

    /* logging-out from server */
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/logout', {
        method: 'GET',
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      }); // no sanity check at all. Trust me, everything will be fine ^^
      setUser(null);
      localStorage.removeItem('logged_user');
      navigate('/');

  }


  /**
   * Edits a user account details
   */
  const editAccount = async ({ firstname, lastname, email }) => {

    setEditAccountMessage({ type: '', msg: '' });

    // sanity checks
    if (!user) {
      setEditAccountMessage({ type: 'error', msg: 'wth is going on?? How did you get there !?' });
      setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
      return;
    }
    if (user.firstname == firstname && user.lastname == lastname && user.email == email) {
      setEditAccountMessage({ type: 'ignore', msg: 'Nothing changed yo, are you serious ?' });
      setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
      return;
    }

    /* editing from server */
      let status;
      const res = await fetch(import.meta.env.VITE_SERVER_URL + '/my-account/edit', { // PROTECTED ROUTE (requires valid jwt token)
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
        }),
        credentials: 'include', // required for allowing server to read cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) { // edit succeeded ==> user was returned
            setUser(res.user);
            setEditAccountMessage({ type: 'success', msg: 'Your account was successfully updated!' });
            setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
          }
          else { // edit failed
            if (status === 400) // error 400 means we trigerred it and sent a custom message back
              setEditAccountMessage({ type: 'error', msg: res.message });
            else  // any other error code is not trigerred by us so no custom message sent
              setEditAccountMessage({ type: 'error', msg: res.statusText });
          
            setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
          }
        })
        .catch(res => {
          setEditAccountMessage({ type: 'error', msg: 'An unexpected error occured!' });
          setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
        });
    
  }

  // ~~ that's a lot of comments.. ~~


  return (
    <AuthContext.Provider value={{ loading, errorMsg, setErrorMsg, user, register, login, restore_login, logout, editAccount, editAccountMsg }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;