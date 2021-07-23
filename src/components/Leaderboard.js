import React, { useEffect } from 'react'
import { firestore } from '../firebase'

const Leaderboard = () => {
    useEffect(() => {
        firestore.collection('leaderboard').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data())
            })
        })
    }, [])
    return (
        <div>
            Leaderboard page
        </div>
    )
}

export default Leaderboard