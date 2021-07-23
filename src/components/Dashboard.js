import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase'
import { Button, Tabs, Tab } from 'react-bootstrap'
import DashboardTable from './DashboardTable'

export default function Dashboard({ questionChange }) {
    const [userData, setUserData] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState('')
    const { currentUser } = useAuth()
    useEffect(() => {
        firestore.collection('users').doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                setUserData(doc.data())
            } else {
                console.log("Unable to retrieve user")
            }
        }).catch(error => console.log("Error getting document:", error))
    }, [])
    useEffect(() => {
        if (userData) {
            setSelectedSubject(userData.subjects[0].label)
            let computedScoreObj = {
                easy: {
                    totalScore: 0,
                    totalTests: 0,
                    averageScore: 0
                },
                medium: {
                    totalScore: 0,
                    totalTests: 0,
                    averageScore: 0
                },
                hard: {
                    totalScore: 0,
                    totalTests: 0,
                    averageScore: 0
                }
            }
            userData.scores.forEach(score => {
                if (score.subject === selectedSubject) {
                    if (score.difficulty === 'easy') {
                        computedScoreObj.easy.totalScore += score.score / 10
                        computedScoreObj.easy.totalTests += 1
                    } else if (score.difficulty === 'medium') {
                        computedScoreObj.medium.totalScore += (score.score / 10) * 2
                        computedScoreObj.medium.totalTests += 1
                    } else {
                        computedScoreObj.hard.totalScore += (score.score / 10) * 3
                        computedScoreObj.hard.totalTests += 1
                    }
                }
            })
            computedScoreObj.easy.averageScore = (computedScoreObj.easy.totalScore / computedScoreObj.easy.totalTests) || 0
            computedScoreObj.medium.averageScore = (computedScoreObj.medium.totalScore / computedScoreObj.medium.totalTests) || 0
            computedScoreObj.hard.averageScore = (computedScoreObj.hard.totalScore / computedScoreObj.hard.totalTests) || 0
            const computedScore = computedScoreObj.easy.averageScore + computedScoreObj.medium.averageScore + computedScoreObj.hard.averageScore

            if (computedScore < 1.4) {
                questionChange('difficulty', 'easy')
            }  else if (computedScore < 2.4) {
                questionChange('difficulty', 'medium')
            } else {
                questionChange('difficulty', 'hard')
            }
        }
    })
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