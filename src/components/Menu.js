import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Button, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png'

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

    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px'
    }
    const logoStyle = {
        height: '50px',
        maxWidth: '50px'
    }
    if (currentUser) {
        return (
            <div style={style}>
                <Link to="/dashboard">
                    <img src={logo} alt="POGGERS" style={logoStyle}/>
                </Link>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="/leaderboard">
                            Leaderboard
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={handleLogout}>
                            Log out
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        )
    } else {
        return (
            <div style={style}>
                <Link to="/">
                    <img src={logo} alt="POGGERS" style={logoStyle}/>
                </Link>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="/leaderboard">
                            Leaderboard
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/signup">
                        Sign up
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/login">
                        Login
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }
}

export default Menu