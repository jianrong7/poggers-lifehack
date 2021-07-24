import React, { useState, useEffect } from 'react'
import services from '../services/services'
import { shuffle, collateOptions } from '../utils/utils'
import { Alert, Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { firestore } from '../firebase'
import firebase from 'firebase';
import { useAuth } from '../contexts/AuthContext'

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
    // useEffect(() => {
    //     setDifficulty(determineDifficulty)
    //     if (selectedSubject === 'Mathematics') {
    //         setSubject({ label: 'Mathematics', value: 19 })
    //     } else if (selectedSubject === 'Geography') {
    //         setSubject({ label: "Geography", value: 22 })
    //     } else if (selectedSubject === 'History') {
    //         setSubject({ label: "History", value: 23 })
    //     } else if (selectedSubject === 'Art') {
    //         setSubject({ label: "Art", value: 25 })
    //     }
    // }, [determineDifficulty, selectedSubject])

    const handleOptionClick = async (option) => {
        setCurrentQuestion(currentQuestion + 1)
        checkCorrect(option)
        if (currentQuestion === 9) {
            setQuestions(null)
            const dateObj = new Date();
            const month = dateObj.getUTCMonth() + 1; //months from 1-12
            const day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();

            const newdate = year + "/" + month + "/" + day;
            await firestore.collection('users')
                .doc(currentUser.uid)
                .update({
                    scores: firebase.firestore.FieldValue.arrayUnion({
                        date: newdate,
                        difficulty,
                        score,
                        subject
                    })
                })
                .then(() => {
                    setCurrentQuestion(0)
                    history.push('/dashboard')
                })
                .catch(error => console.log("error writing document: ", error))
        }
    }
    const checkCorrect = (option) => {
        if (option.isCorrect) {
            setAlert('Correct')
            setIsSuccess(true)
            setScore(score + 1)
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
                            {console.log(questions[currentQuestion].question)}
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
