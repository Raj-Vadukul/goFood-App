import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import cart from '../Cartimg.svg';
import home from '../Home.svg';
import login from '../Login.svg';
import signup from '../Signup.svg';
import logout from '../Logout.svg';
import order from '../Order.svg';
import Cart from '../screen/Cart';
import { useCart } from './ContexReducer';

export default function Navbar() {
    let data = useCart();
    const [cartView, setcartView] = useState(false);
    const navigate = useNavigate();
    const HandleLogOut = () => {
        localStorage.removeItem("authToken")
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#055160"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fst-italic" to="/">getFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 active" aria-current="page" to="/">
                                    <img src={home} alt="" style={{height:"2rem",width:"2rem"}}/>
                                </Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 active" aria-current="page" to="/myOrder">
                                        <img src={order} alt="" style={{height:"2rem",width:"2rem",marginBottom:"-7px"}}/>
                                    </Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className="d-flex">
                                <Link className="btn" to="/login">
                                    <img src={login} alt="" style={{height:"2rem",width:"2rem",marginLeft:"-15px"}}/>
                                </Link>
                                <Link className="btn" to="/SignUp">
                                    <img src={signup} alt="" style={{height:"2rem",width:"2rem"}}/>
                                </Link>
                            </div>
                            :
                            <div>
                                <div className='btn' onClick={() => { setcartView(true) }}>
                                     <img src={cart} alt="" style={{height:"2rem",width:"2rem",marginLeft:"-15px"}}/>
                                    <Badge pill bg="danger">{data.length === 0? "": data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setcartView(false)}><Cart></Cart></Modal> : null}
                                <div className='btn' onClick={HandleLogOut}>
                                    <img src={logout} alt="" style={{height:"2rem",width:"2rem"}}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

