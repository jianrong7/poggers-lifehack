import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const Courses = () => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    console.log(currentUser)
    const startQuestions = () => {
        history.push('/questions')
    }
    return (
        <div>
            <Button variant="link" onClick={startQuestions}>Start</Button>
        </div>
    )
}

export default Courses