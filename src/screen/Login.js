import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    const [Value, setValue] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ email: Value.email, password: Value.password })
        });
        const json = await response.json()
        console.log(json)
        if (!json.success) {
            alert("Please Enter Valid Email or Password");
        }
        if (json.success) {
            localStorage.setItem("userEmail",Value.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/")
        }
    }
    const onChange = (event) => {
        setValue({ ...Value, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div className="wrapper">
                <h1>Login</h1>
                <form onSubmit={HandleSubmit}>
                    <input className='form' type="email" placeholder='Email' name='email' value={Value.email} onChange={onChange} />
                    <input className='form' type="password" placeholder='Password' name='password' value={Value.password} onChange={onChange} />
                    <div className="recover"><Link>Forgot Password ?</Link></div>
                    <button className='login'>
                        Login
                    </button>
                </form>
                <div className="member">
                    Not a Member ? <Link to='/SignUp'>Register Now</Link>
                </div>
            </div>
        </div>
    )
}
