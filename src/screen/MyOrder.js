import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function MyOrder() {
    const [orderData, setoderData] = useState("");
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:5000/api/myorderData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        }).then(async (res) => {
            let response = await res.json();
            await setoderData(response);
        })
    }
    useEffect(() => {
        fetchMyOrder();
    }, [])
    return (
        <>
            <div><Navbar /></div>
            <div>

                <div className="container">
                    <div className="row">

                        {orderData !== {} ? Array(orderData).map(data => {
                            return (
                                data.orderData ? data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div>
                                                    {arrayData.Order_date ?
                                                        <div style={{ fontSize: "25px", fontWeight: "bolder", marginTop: "25px" }}>
                                                            {data = arrayData.Order_date}
                                                            <hr />
                                                        </div> :
                                                        <div className="col-md-3">
                                                            <div className="card mt-3">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                                        <span className="m-1">{arrayData.Qty}</span>
                                                                        <span className="m-1">{arrayData.size}</span>
                                                                        <span className="m-1" style={{fontWeight:"bold"}}> ₹ {arrayData.price} </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )

                                }) : ""
                            )
                        }) : ""
                        }
                    </div>

                </div>
            </div>
            <div><Footer /></div>
        </>
    )
}
