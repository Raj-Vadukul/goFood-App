import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContexReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options)
    let food = props.foodItems;
    let data = useCart();
    const priceRef = useRef();
    const [Qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const HandleAddtoCart = async () => {
        let Food = [];
        for (const item of data) {
            if (item.id === food._id) {
                Food = item; 
                break;
            }
        }
        if (Food !== []) {
            if (Food.size === size) {
                await dispatch({ type: "UPDATE", id: food._id, price: finalPrice, Qty: Qty })
                return;
            }
            else if (Food.size !== size) {
                await dispatch({ type: "ADD", id: food._id, name: food.name, price: finalPrice, Qty: Qty, size: size });
                return
            }
            return 
        }
        await dispatch({ type: "ADD", id: food._id, name: food.name, price: finalPrice, Qty: Qty, size: size });
    }
    let finalPrice = Qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className='mx-3'>
            <div className="card my-3">
                <img src={food.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: 'fill' }} />
                <div className="card-body">
                    <h5 className="card-title">{food.name}</h5>
                    <div className='w-100'>
                        <select className="m-2 h-100 bg-success rounded text-white" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded text-white" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹ {finalPrice} /-
                        </div>
                    </div>
                    <hr />
                    <button className={`btn btn-success justify-center ms-2`} onClick={HandleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
