import React from 'react'
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <div>
                <Link to="/">POGGERS</Link>
            </div>
            <nav>
                <Link to='/courses'>Our courses</Link>
                <Link to='/leaderboard'>Leaderboard</Link>
                <Link to='/signup'>Sign up</Link>
                <Link to='/login'>Login</Link>
            </nav>
        </div>
    )
}

export default Menu