import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(189 235 227 / 83%)',
    transform: 'translate(-50%,-50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
}

export default function Modal({ children, onClose }) {
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <button className="btn fs-4" style={{ backgroundColor:"red" ,marginLeft: "95%", marginTop: "-30px",height: "40px", border: "2px solid white",borderRadius:"60%", color:"wheat"}} onClick={onClose}> <div style={{marginTop:"-7px"}}>x</div> </button>
                {children}
            </div>
        </>,
        document.getElementById('cart-root')
    )
}
