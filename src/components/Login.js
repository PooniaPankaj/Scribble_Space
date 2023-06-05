
import { React, useState } from 'react';

import { Link, useNavigate } from "react-router-dom"

function Login(props) {
    const navigate = useNavigate();

    const host = "http://localhost:8000";
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const handlesubmit = async (e) => {

        // for preventing our page to reload again
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Login successfully ", "success");
        }
        else {
            props.showAlert("Invalid credentials", "warning");


        }

    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className=' d-flex  w-100 h-100 justify-content-between login_page_cont'>

            <div className="  w-50 h-100 d-flex flex-column ">
                <div className="container w-75 ">
                    <h1 className='heading text_mod'><i className="fa-solid fa-newspaper"></i>Scribble Space</h1>
                    <div className='container d-flex justify-content-center'>
                        <span className="text first-text">
                            Welcome
                        </span>
                        <span className="text second-text">
                            Back !
                        </span>
                    </div>
                    <div className="login_content">
                        Please enter your email address and password to proceed.
                        <form className='form_of_login' onSubmit={handlesubmit}>
                            <div className="form-group my-4">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onchange} />
                            </div>
                            <button type="submit" className="submit-btn btn btn-secondary w-100 my-4">Login </button>

                            <hr></hr>
                            <h5 className='d-flex justify-content-center'>or</h5>
                            <Link type="button" className="btn btn-secondary w-100 my-4" to='/signup'>Sign-Up </Link>

                        </form>
                    </div>

                </div>



            </div>
            <div className="bg-image login_img ">
                <img src="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png" alt="Italian Trulli" />
            </div>

        </div>
    );
}
export default Login;
