import React, { useState, useEffect } from 'react'
import services from '../services/services'
import { shuffle } from '../utils/utils'
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
            let temp = []
            questions.map(question => {
                let options = []
                if (question.incorrect_answers.length === 1) {
                    options = [
                        { option: question.correct_answer, isCorrect: true },
                        { option: question.incorrect_answers[0], isCorrect: false }
                    ]
                } else {
                    options = [
                        { option: question.correct_answer, isCorrect: true },
                        { option: question.incorrect_answers[0], isCorrect: false },
                        { option: question.incorrect_answers[1], isCorrect: false },
                        { option: question.incorrect_answers[2], isCorrect: false }
                    ]
                }
                temp.push(options)
            })
            setQuestionOptions(temp)
        }
    }, [questions])
    useEffect(() => {
        setDifficulty(determineDifficulty)
        if (selectedSubject === 'Mathematics') {
            setSubject({ label: 'Mathematics', value: 19 })
        } else if (selectedSubject === 'Geography') {
            setSubject({ label: "Geography", value: 22 })
        } else if (selectedSubject === 'History') {
            setSubject({ label: "History", value: 23 })
        } else if (selectedSubject === 'Art') {
            setSubject({ label: "Art", value: 25 })
        }
    }, [determineDifficulty, selectedSubject])

    const handleOptionClick = async (option) => {
        setCurrentQuestion(currentQuestion + 1)
        checkCorrect(option)
        if (currentQuestion === 9) {
            setQuestions(null)
            await firestore.collection('users')
                .doc(currentUser.uid)
                .update({
                    scores: firebase.firestore.FieldValue.arrayUnion({
                        date: Date.now(),
                        difficulty,
                        score,
                        subject: subject.label
                    })
                })
                .catch(error => console.log("error writing document: ", error))

            setCurrentQuestion(0)
            history.push('/leaderboard')
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
                        {isSuccess === null ? null : isSuccess === true ? <Alert variant='success'>{alert}</Alert> : <Alert variant='danger'>{alert}</Alert>}
                        <h2>Question {currentQuestion + 1}/{questions.length}</h2>
                        <h4>Category: {questions[currentQuestion].category}</h4>
                        <h2>{questions[currentQuestion].question}</h2>
                        {questionOptions === null ? null : shuffle(questionOptions[currentQuestion]).map(option => {
                            return (
                                <Button key={option.option} onClick={() => handleOptionClick(option)} style={{ backgroundColor: "#1E0973", margin: '10px' }}>
                                    {option.option}
                                </Button>
                            )
                        })}
                        <h3>Score: {score}</h3>
                    </div>
                </Card.Body>
            </Card>
        )
    } else {
        return null
    }
}
