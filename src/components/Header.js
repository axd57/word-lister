import React, { Component } from 'react'
import logo from '../assets/logo.png'
export class Header extends Component {
    render() {
        return (
        <div className="text-center">
            <img src={logo}  alt="Logo" style={{marginTop: "15px", width: "20%"}} />
        </div>
        )
    }
}

export default Header