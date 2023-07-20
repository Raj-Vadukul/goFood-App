import '../SignUp.css'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function SignUp() {
    let navigate = useNavigate();
    const [Value, setValue] = useState({ name: "", email: "", password: "", location: "" })
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: Value.name, email: Value.email, location: Value.location, password: Value.password })
        });
        const json = await response.json()
        console.log(json)
        if (!json.success) {
            alert("Please Enter Valid Credentials");
        }
        if (json.success){
            navigate('/login');
        }
    }
    const onChange = (event) => {
        setValue({ ...Value, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className="wrapper">
                <h1>Sign Up</h1>
                <form onSubmit={HandleSubmit}>
                    <input className='item' type="text" placeholder='Name' name='name' value={Value.name} onChange={onChange} />
                    <input className='item' type="email" placeholder='Email' name='email' value={Value.email} onChange={onChange} />
                    <input className='item' type="password" placeholder='Password' name='password' value={Value.password} onChange={onChange} />
                    <input className='item' type="text" placeholder='Address' name='location' value={Value.location} onChange={onChange} />
                    <div className="terms">
                        <input type="checkbox" id='checkbox' />
                        <label htmlFor="checkbox"> I agree to these <Link to="#">Terms & Conditions</Link></label>
                    </div>
                    <button type='submit' className='Signup'>Submit</button>
                </form>
                <div className="member">
                    Already a Member ? <Link to='/login'>Login Here</Link>
                </div>
            </div>
        </>
    )
}
