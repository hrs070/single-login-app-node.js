import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import SignedInUser from './SignedInUser.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../state/actions.js';

export default function Main() {
    const dispatch = useDispatch();
    const isLoggedin = useSelector((state) => state.signinStateReducer)

    function googleSucces(res) {
        const token = res?.tokenId;
        const { name, email } = res?.profileObj;
        const result = { name: name, email: email, token: token }
        dispatch(signIn(result));
    }
    function googleFailure(error) {
        console.log('Google Sign In failed');
        console.log(error);
    }
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("singleLoginSession"));
        let result = {};
        if (localUser) {
            if (localUser?.status === 200) {
                if (localUser.data.newUser) {
                    const { name, email, token } = localUser.data.newUser;
                    result = { name: name, email: email, token: token }

                } else if (localUser.data.existingUser) {
                    const { name, email, token } = localUser.data.existingUser;
                    result = { name: name, email: email, token: token }
                }
            }
            dispatch(signIn(result));
        }
    }, [])

    return (
        <div className="main">
            {!isLoggedin ?
                <GoogleLogin
                    clientId="580735389692-2mne57mpso945clqafp28j9g2828e0ir.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button className="button googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled} >
                            Sign In with Google
                        </button>
                    )} onSuccess={googleSucces} onFailure={googleFailure} cookiePolicy={"single_host_origin"}
                />
                :
                <SignedInUser />
            }
        </div>
    )
}