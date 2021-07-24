import React, { useState, useEffect } from 'react'
import services from '../services/services'
import { shuffle, collateOptions, getDate } from '../utils/utils'
import { Alert, Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { firestore } from '../firebase'
import firebase from 'firebase';
import { useAuth } from '../contexts/AuthContext'
import { uniqueId } from 'lodash'

export default function Questions({ determineDifficulty, selectedSubject }) {
    const [questions, setQuestions] = useState(null)
    const [difficulty, setDifficulty] = useState(determineDifficulty)
    const [subject, setSubject] = useState(selectedSubject)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questionOptions, setQuestionOptions] = useState(null)
    const [score, setScore] = useState(0)
    const [isSuccess, setIsSuccess] = useState(null)
    const [alert, setAlert] = useState('')

    const history = useHistory()

    const { currentUser } = useAuth()

    useEffect(() => {
        if (selectedSubject === 'Mathematics') {
            services.getAll(difficulty, 19)
            .then(serverQuestions => {
                setQuestions(serverQuestions.results)
            })
        } else if (selectedSubject === 'Geography') {
            services.getAll(difficulty, 22)
            .then(serverQuestions => {
                setQuestions(serverQuestions.results)
            })
        } else if (selectedSubject === 'History') {
            services.getAll(difficulty, 23)
            .then(serverQuestions => {
                setQuestions(serverQuestions.results)
            })
        } else if (selectedSubject === 'Art') {
            services.getAll(difficulty, 25)
            .then(serverQuestions => {
                setQuestions(serverQuestions.results)
            })
        }
        return (
            setQuestions(null)
        )
    }, [])
    useEffect(() => {
        if (questions) {
            setQuestionOptions(collateOptions(questions))
        }
    }, [questions])

    const handleOptionClick = async (option) => {
        setCurrentQuestion(prevQuestion => prevQuestion + 1)
        if (currentQuestion === 9) {
            let newScore = score
            if (option.isCorrect) {
                newScore += 1
            }
            setCurrentQuestion(0)
            history.push('/dashboard')
            setQuestions(null)

            await firestore.collection('users')
                .doc(currentUser.uid)
                .update({
                    scores: firebase.firestore.FieldValue.arrayUnion({
                        id: uniqueId(),
                        date: getDate(),
                        difficulty,
                        score: newScore,
                        subject
                    })
                }).catch(error => console.log("error writing document: ", error))
        }
        checkCorrect(option)
    }
    const checkCorrect = (option) => {
        if (option.isCorrect) {
            setAlert('Correct')
            setIsSuccess(true)
            setScore(prevScore => prevScore + 1)
        } else {
            setAlert('Wrong')
            setIsSuccess(false)
        }
    }
    if (questions) {
        return (
            <Card style={{ margin: '50px' }}>
                <Card.Body className="text-center mb-4">
                    <div key={questions[currentQuestion].question}>
                        {isSuccess === null ? <Alert style={{ backgroundColor:'white', color:"white" }}>null</Alert> : isSuccess === true ? <Alert variant='success'>{alert}</Alert> : <Alert variant='danger'>{alert}</Alert>}
                        <div>
                            <h2>Question {currentQuestion + 1}/{questions.length}</h2>
                            <h4>Category: {questions[currentQuestion].category}</h4>
                            <h2>{JSON.parse( JSON.stringify(questions[currentQuestion].question) )}</h2>
                            {questionOptions === null ? null : shuffle(questionOptions[currentQuestion]).map(option => {
                                return (
                                    <Button key={option.option} onClick={() => handleOptionClick(option)} style={{ backgroundColor: "#1E0973", margin: '10px' }}>
                                        {option.option}
                                    </Button>
                                )
                            })}
                            <h3>Score: {score}</h3>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    } else {
        return null
    }
}
