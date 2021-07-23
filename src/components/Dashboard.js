import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const { currentUser } = useAuth()
    console.log(currentUser.uid)
    return (
        <div>
            <h1>Welcome</h1>
        </div>
    )
}
