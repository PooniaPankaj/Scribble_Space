import {React,useState} from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom"
import './login_1.css'
const Login_new = (props) => {
    const navigate = useNavigate();

    const host = "http://localhost:8000";
    const [credentials, setcredentials] = useState({ name:"" ,email: "", password: "",cpassword:"" });
    const handlesubmit = async (e) => {

        // for preventing our page to reload again
        e.preventDefault();

        const response = await fetch(`${host}/api/user/createUser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json);
        if (json.authToken!=null){
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("Account created successfully ","success");
        }
        else{
            props.showAlert("Invalid credentials","danger");


        }

    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container d-flex justify-content-center'>
            <div className="form-structor">
                <div className="signup">
                    <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                    <form onSubmit={handlesubmit}> 
                    <div className="form-holder">
                        <input type="text" className="input" placeholder="Name" name="name" onChange={onchange} />
                        <input type="email" className="input" placeholder="Email" name="email" onChange={onchange}/>
                        <input type="password" className="input" placeholder="Password" name="password" onChange={onchange} minLength={5}/>
                        <input type="password" className="input" placeholder="Confirm Password" name="cpassword" onChange={onchange} minLength={5}/>
                        
                    </div>
                    <button className="submit-btn" disabled={credentials.password<5}>Sign up</button>
                    </form>
                </div>
                <div className="login slide-up">
                    <div className="center">
                        <Link className="d-flex justify-content-center form-title" id="login" to="/login"><span>or</span>Log in</Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login_new
