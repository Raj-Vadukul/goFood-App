import React from 'react';
import trash from '../trash.svg';
import { useCart, useDispatchCart } from '../components/ContexReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 text-center' style={{color:"black",fontWeight:"600",fontSize:"35px"}}>The Cart is Empty!</div>
            </div>
        )
    }
    const HandleCheckOut = async ()=>{
        let UserEmail = localStorage.getItem("userEmail");
        let response = await fetch ("http://localhost:5000/api/orderData",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify ({
                order_data : data,
                email : UserEmail,
                order_date : new Date().toDateString()
            })
        });
        if(response.status === 200){
            dispatch ({type : "DROP"})
        }
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div className='cart'>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-dark fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>{data.map((food, index) => (
                        <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.Qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type='button' className='btn p-0'><img src={trash} alt="Delete" style={{height:"20px", width:"18px",marginRight:"0"}} onClick={()=>{dispatch({type: "REMOVE", index:index})}}/></button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price = ₹ {totalPrice} /-</h1></div>
                <div>
                    <button className='btn mt-5' onClick={HandleCheckOut} style={{backgroundColor:"rgb(17 107 143)",color:"white",borderRadius:"10px"}}>Place Order</button>
                </div>
            </div>
        </div>
    )
}
