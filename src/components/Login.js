// import React from 'react'

// const Login = () => {
//   return (
//     <div>

//     </div>
//   )
// }



import { React, useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useLocation } from "react-router-dom"

function Login() {
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
        console.log(json);

    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <MDBContainer fluid className="p-4 my-5 h-custom w-50 border border-grey rounded p-4 ">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>



                    {/* <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 h1">Login</p>
          </div> */}
                    <form onSubmit={handlesubmit}>

                        <MDBInput  label='Email address' id='email' type='email' name="email" size="lg" onChange={onchange} placeholder='Email' />
                        <MDBInput  label='Password' id='password' type='password' name="password" size="lg" onChange={onchange} placeholder='Password'/>

                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <div className='text-center text-md-start mt-4 pt-2 my-4 '>
                            <MDBBtn className="mb-0 px-5" size='lg' >Login</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2 my-4">Don't have an account? <Link to="/signup" className="link-danger">Register</Link></p>
                        </div>

                    </form>

                </MDBCol>

            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2023. All rights reserved.
                </div>

                <div>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='facebook-f' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='twitter' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='google' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='linkedin-in' size="md" />
                    </MDBBtn>

                </div>

            </div>

        </MDBContainer>
    );
}

// const Login = () => {

//     const [credentials, setcredentials] = useState({email:"",password:""});
//     const host = "http://localhost:8000";
//     const handlesubmit = async (e) => {

//         // for preventing our page to reload again
//         e.preventDefault();

//         const response = await fetch(`${host}/api/auth/login`, {
//             method: "POST", // *GET, POST, PUT, DELETE, etc.
//             headers: {
//                 "Content-Type": "application/json",

//             },
//             body:JSON.stringify({email:credentials.email,password:credentials.password})

//         });
//         const json = await response.json();
//         console.log(json);

//         if (json.success){

//         }
//         else{

//         }

//     }

// const onchange = (e)=>{
//     setcredentials({...credentials,[e.target.name]:e.target.value});
// }

//     return (


//     <div>
//         <form onSubmit={handlesubmit}>
//             <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email address</label>
//                 <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onchange} aria-describedby="emailHelp" />
//                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input type="password" className="form-control" value={ credentials.password} id="password" onChange={onchange} name="password" />
//             </div>

//             <button type="submit" className="btn btn-primary">Submit</button>
//         </form>


//     </div>
//     )
//   }


export default Login;
