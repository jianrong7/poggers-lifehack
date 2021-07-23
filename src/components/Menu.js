import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Menu = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    if (currentUser) {
        return (
            <div>
                <div>
                    <Link to="/">POGGERS</Link>
                </div>
                <nav>
                    <Link to='/courses'>Our courses</Link>
                    <Link to='/leaderboard'>Leaderboard</Link>
                    <Button variant="link" onClick={handleLogout}>Log out</Button>
                </nav>
            </div>
        )
    } else {
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
}

export default Menu