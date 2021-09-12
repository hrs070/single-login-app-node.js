import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { logOut, logOutOthers } from '../state/actions.js';


export default function SignedInUser() {
    const dispatch = useDispatch();
    let result = useSelector((state) => state.authReducer);
    console.log(result);

    const name = useRef();
    const email = useRef();
    const token = useRef();
    const [authenticatedUser, setAuthenticatedUser] = useState();

    useEffect(() => {
        if (result?.status === 200) {
            if (result.data.newUser) {
                name.current = result.data.newUser.name;
                email.current = result.data.newUser.email;
                token.current = result.data.newUser.token;

            } else if (result.data.existingUser) {
                name.current = result.data.existingUser.name;
                email.current = result.data.existingUser.email;
                token.current = result.data.existingUser.token;
            }
            setAuthenticatedUser(true);
        } else if (result?.status === 201) {
            if (result.data.existingUser) {
                name.current = result.data.existingUser.name;
                email.current = result.data.existingUser.email;
                token.current = result.data.existingUser.token;
            }
            setAuthenticatedUser(false)
        }
    }, [result])

    function handleLogout() {
        dispatch(logOut({ email: email.current }));
    }
    function handleLogoutOthers() {
        result = { name: name.current, email: email.current, token: token.current };
        dispatch(logOutOthers(result));
    }

    return (
        <div className="user">
            {authenticatedUser ?
                <div className="authenticated-user">
                    <p className="login-success">Signed In</p>
                    <div className="user-details">
                        <div>
                            <p className="small-text">Name</p>
                            <p className="user-name">{name.current}</p>
                        </div>
                        <div>
                            <p className="small-text">Email</p>
                            <p className="user-name">{email.current}</p>
                        </div>
                    </div>
                    <button className="button button-reject" onClick={handleLogout}>Log Out</button>
                </div>
                :
                <div className="authenticated-user">
                    <p className="login-success">Can not Sign In</p>
                    <div className="user-details">
                        <p className="confirm-signout-others-msg">{name.current}, you are logged in somewhere else. Log out and Sign In here instead ?</p>
                    </div>
                    <button className="button button-reject" onClick={handleLogoutOthers}>Log Out</button>
                </div>
            }
        </div>
    )
}