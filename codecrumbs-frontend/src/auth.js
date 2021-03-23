import React from 'react';
import ReactDOM from 'react-dom';
import './auth.css';

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
        console.log("haha yes");
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

export default Auth;

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