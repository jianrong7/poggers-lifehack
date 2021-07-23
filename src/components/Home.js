import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'


const Home = () => {
    const [error, setError] = useState('')
    const { currentUser } = useAuth()

    const style = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        alignContent: 'center',
        justifyContent: 'center',
        height: '80vh'
    }
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
            <div style={style}>
                <h1>Revolutionising how we learn and teach</h1>
                <h2>A safe, exciting and effective tool for all learners and educators</h2>
                <Link to="/signup"><Button style={{ backgroundColor: "#1E0973"}}>Sign up now</Button></Link>
            </div>
        )
    }
}

export default Home