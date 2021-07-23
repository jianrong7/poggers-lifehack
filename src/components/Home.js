import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'


const Home = () => {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    if (currentUser) {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email: </strong> {currentUser.email}
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                            Update Profile
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Revolutionising how we learn and teach</h1>
                <h2>A safe, exciting and effective tool for all learners and educators</h2>
                <button><Link to="/signup">Sign up now</Link></button>
            </div>
        )
    }
}

export default Home