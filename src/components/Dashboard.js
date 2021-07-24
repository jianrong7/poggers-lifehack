import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'
import { Button, Tabs, Tab, ProgressBar } from 'react-bootstrap'
import DashboardTable from './DashboardTable'
import { computedScoreForAlgorithm, setProgressBarStatusAlgorithm } from '../utils/utils'

export default function Dashboard({ questionChange }) {
    const [userData, setUserData] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState('')
    const [computedScoreObjState, setComputedScoreObjState] = useState(null)
    const [progressBarStatus, setProgressBarStatus] = useState(null)
    const { currentUser } = useAuth()
    useEffect(() => {
        firestore.collection('users').doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                setUserData(doc.data())
                questionChange('subject', doc.data().subjects[0].label)
            } else {
                console.log("Unable to retrieve user")
            }
        }).catch(error => console.log("Error getting document:", error))
    }, [])
    useEffect(() => {
        if (userData) {
            if (!progressBarStatus) {
                setSelectedSubject(userData.subjects[0].label)

                setComputedScoreObjState(computedScoreForAlgorithm(userData, selectedSubject))
            }
        }
    })
    useEffect(() => {
        if (computedScoreObjState) {
            const computedScore = computedScoreObjState.easy.averageScore + computedScoreObjState.medium.averageScore + computedScoreObjState.hard.averageScore
            setProgressBarStatus(setProgressBarStatusAlgorithm(computedScoreObjState))
    
            if (computedScore < 1.4) {
                questionChange('difficulty', 'easy')
            }  else if (computedScore < 2.4) {
                questionChange('difficulty', 'medium')
            } else {
                questionChange('difficulty', 'hard')
            }
        }
    }, [computedScoreObjState])
    const handleTabClick = (e) => {
        questionChange('subject', e.target.textContent)
        setSelectedSubject(e.target.textContent)
    }
    if (userData) {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h1>Welcome {userData.name}!</h1>
                    <Link to="/questions">
                        <Button style={{ backgroundColor: "#1E0973" }}>
                            Start your practice!
                        </Button>
                    </Link>
                </div>
                {progressBarStatus 
                ? 
                <ProgressBar style={{ margin: '50px 30px 0 30px' }}>
                    <ProgressBar now={progressBarStatus.easy} label={`Easy: ${progressBarStatus.easy}%`} variant="success" animated key={1} />
                    <ProgressBar now={progressBarStatus.medium} label={`Medium: ${progressBarStatus.medium}%`} variant="warning" animated key={2} />
                    <ProgressBar now={progressBarStatus.hard} label={`Hard: ${progressBarStatus.hard}%`} variant="danger" animated key={3} />
                </ProgressBar>
                : 
                null}
                <Tabs onClick={handleTabClick} defaultActiveKey={userData.subjects[0].label} id="uncontrolled-tab-example" className="mb-3" style={{ margin: '30px' }}>
                    {userData.subjects.map(subject => {
                        return (
                            <Tab eventKey={subject.label} title={subject.label} key={subject.label + subject.value} style={{ margin: '30px' }}>
                                <DashboardTable userData={userData} subject={subject}/>
                            </Tab>
                        )
                    })}
                </Tabs>
            </div>
        )
    } else {
        return null
    }
}