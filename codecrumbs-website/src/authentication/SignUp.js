import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "./providers/UserProvider";
import { auth, signInWithGoogle, generateUserDocument } from "./firebase/firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, displayName, email, password) => {
        event.preventDefault();
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { displayName });

            window.localStorage.setItem("userId", user.uid);
            navigate('mainPage');

            // chrome.runtime.sendMessage({name: "userIdSet", userId: user.uid}, (response) => {
            //     console.log(response.message)
            // })
        }
        catch (error) {
            setError('Error Signing up with email and password');
            console.log(error);
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    return (
        <div className="mt-8">
            <h1 className="text-3xl mb-2 text-center font-bold">Create Account</h1>
            <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                {error !== null && (
                    <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                        {error}
                    </div>
                )}
                <form className="">
                    <label htmlFor="displayName" className="block overline" style={{marginBottom: '4px', float: 'left'}}>
                        Username:
          </label>
                    <input
                        type="text"
                        className="my-1 p-1 w-full "
                        name="displayName"
                        value={displayName}
                        placeholder="E.g: joebruin1919"
                        id="displayName"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userEmail" className="block overline" style={{marginTop: '16px', marginBottom: '4px', float: 'left'}}>
                        Email:
          </label>
                    <input
                        type="email"
                        className="my-1 p-1 w-full"
                        name="userEmail"
                        value={email}
                        placeholder="E.g: joebruin1919@gmail.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="block overline" style={{marginTop: '16px', marginBottom: '4px', float: 'left'}}>
                        Password:
          </label>
                    <input
                        type="password"
                        className="mt-1 mb-3 p-1 w-full"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                    />
                    <div className="trackerButton">
                        <button
                            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white onboardButtonOutlined"
                            color="#a10505"
                            onClick={() => signInWithGoogle()}
                            style={{marginRight: '8px'}}>
                                Sign In with Google
                        </button>
                        <button
                            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white onboardButton"
                            color="#a10505"
                            onClick={event => {
                                createUserWithEmailAndPasswordHandler(event, displayName, email, password);
                            }}>
                                Create Account
                        </button>
                    </div>
                    
                </form>
                {/* <p className="text-center my-3">or</p> */}
                {/* <button
                    className="bg-red-500 hover:bg-red-600 w-full py-2 text-white onboardButton"
                    onClick={() => signInWithGoogle()}
                >
                    Sign In with Google
        </button> */}
                <p className="text-center my-3">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:text-blue-600">
                        Sign in here
          </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;