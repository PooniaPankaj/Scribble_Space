import { React, useState } from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom"
import './login_1.css' 
const Login_new = (props) => {
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

        if (json.success){
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("Login successfully ","success");
        }
        else{
            props.showAlert("Invalid credentials","warning");


        }

    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (




        <div className='container d-flex justify-content-center'>
            <div className="form-structor">
                <div className="signup slide-up">

                    <Link className="d-flex justify-content-center form-title" id="signup" to="/signup" ><span>or</span>Sign up</Link>
                </div>
                <form onSubmit={handlesubmit}>
                    <div className="login ">
                        <div className="center">
                            <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                            <div className="form-holder">
                                <input type="email" className="input" name="email" placeholder="Email" onChange={onchange}/>
                                <input type="password" className="input" name="password" placeholder="Password" onChange={onchange} />
                            </div>
                            <button className="submit-btn">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login_new
