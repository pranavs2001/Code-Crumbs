<<<<<<< HEAD
/*global chrome*/
import React from "react";
=======
    /*global chrome*/
import React, { useState } from "react";
>>>>>>> 8d216efa0580dfa5530e40171dae50011af92031
import { Router, Link } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
<<<<<<< HEAD
import { UserContext, UserProvider } from './providers/UserProvider';

function Authentication() {
    var user = null;

    chrome.storage.local.get(['userId'], function (result) {
        console.log('Value currently is ' + result.key);

        userId = result.key.uid;
    });

    return (
        userId ?
            <ProfilePage />
=======
import MainPage from "../MainPage";

function Authentication() {
    const [userId, setUserId] = useState("")

    chrome.storage.local.get(['userId'], function(result) {
        setUserId(result.userId)
    })

    return (
        userId ?
            <MainPage/>
>>>>>>> 8d216efa0580dfa5530e40171dae50011af92031
            :
            <div>
                <nav>
                    <Link to="/">Sign In</Link>
                    <br />
                    <Link to="signUp">Sign Up</Link>
                    <br />
                    <Link to="passwordReset">Reset Password</Link>
                </nav>
                <Router>
                    <SignUp path="signUp" />
                    <SignIn path="/" />
                    <PasswordReset path="passwordReset" />
                    <MainPage path="mainPage"/>
                </Router>
            </div>

    );
}

export default Authentication;


/*<nav>
                    <Link to="/">Sign In</Link>
                    <Link to="signUp">Sign Up</Link>
                    <Link to="passwordReset">Reset Password</Link>
                </nav>
                <Router>
                    <SignUp path="signUp" />
                    <SignIn path="/" />
                    <PasswordReset path="passwordReset" />
                </Router>*/


/*import React from 'react';
import ReactDOM from 'react-dom';
import './auth.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAxAxnARXfjoB33h2lTUXq_wpD7BNFOkic",
    authDomain: "codecrumbs.firebaseapp.com",
    projectId: "codecrumbs",
    storageBucket: "codecrumbs.appspot.com",
    messagingSenderId: "678789643037",
    appId: "1:678789643037:web:a8ca99ad7761309b4abff4",
    measurementId: "G-VBFKZZRSQ7"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
        };
        this.flipAuth = this.flipAuth.bind(this);
    }

    flipAuth() {
        this.setState({
            login: !this.state.login,
        });
    }

    render() {
        var login = this.state.login;
        if (!login) {
            return (
                <div className="auth">
                    <h1>Create Account</h1>
                    <h2>Create a Code Crumbs account to track your history alongside your Github commits.</h2>
                    <h3>Username</h3>
                    <input
                        key="username-input"
                        placeholder={"Type in a username"}
                    />
                    <br />
                    <h3>Email</h3>
                    <input
                        key="email-input"
                        placeholder={"Type in an email"}
                    />
                    <br />
                    <h3>Password</h3>
                    <input
                        key="password-input"
                        placeholder={"Type in a password"}
                    />
                    <br />
                    <h3>Confirm Password</h3>
                    <input
                        key="password-comfirm"
                        placeholder={"Confirm your password"}
                    />
                    <br />
                    <button>CREATE ACCOUNT</button>
                    <button onClick={() => {
                        this.flipAuth();
                    }}>SIGN IN</button>
                </div>
            );
        } else {
            return (
                <div className="auth">
                    <h1>Sign In</h1>
                    <h2>Sign in to your Code Crumbs account to access your tracking history alongside your Github commits.</h2>
                    <h3>Username</h3>
                    <input
                        key="username-input"
                        placeholder={"Type in a username"}
                    />
                    <br />

                    <h3>Password</h3>
                    <input
                        key="password-input"
                        placeholder={"Type in a password"}
                    />
                    <br />
                    <button onClick={() => {
                        this.flipAuth();
                    }}>CREATE ACCOUNT</button>
                    <button>SIGN IN</button>
                </div>
            );
        }
    }
}

export default Auth;*/

/*<input
key="username-input"
placeholder={"Type in a username"}
/>
<br/>
<p>Email</p>
<input
key="email-input"
placeholder={"Type in an email"}
/>
<br/>
<p>Password</p>
<input
key="password-input"
placeholder={"Type in a password"}
/>
<br/>
<p>Confirm Password</p>
<input
key="password-comfirm"
placeholder={"Confirm your password"}
/>*/