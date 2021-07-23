import React, { useState, useEffect } from 'react'
import services from '../services/services'
import { shuffle } from '../utils/utils'
import { Card, Button, Alert } from 'react-bootstrap'

export default function Questions() {
    const [questions, setQuestions] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questionOptions, setQuestionOptions] = useState(null)
    const [score, setScore] = useState(0)
    const [isSuccess, setIsSuccess] = useState(null)
    const [alert, setAlert] = useState('')
    useEffect(() => {
        services.getAll()
            .then(serverQuestions => {
                setQuestions(serverQuestions.results)
            })
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

    const handleOptionClick = (option) => {
        setCurrentQuestion(currentQuestion + 1)
        checkCorrect(option)
    }
    const checkCorrect = (option) => {
        if (option.isCorrect) {
            console.log('correct')
            setAlert('Correct')
            setIsSuccess(true)
            setScore(score + 1)
        } else {
            console.log('wrong')
            setAlert('Wrong')
            setIsSuccess(false)
        }
    }
    if (questions) {
        return (
            <div>
                <div key={questions[currentQuestion].question}>
                    {isSuccess === null ? null : isSuccess === true ? <Alert variant='success'>{alert}</Alert> : <Alert variant='danger'>{alert}</Alert>}
                    <p>Question {currentQuestion + 1}/{questions.length}</p>
                    <p>Category: {questions[currentQuestion].category}</p>
                    <p>{questions[currentQuestion].question}</p>
                    {questionOptions === null ? null : shuffle(questionOptions[currentQuestion]).map(option => {
                        return (
                            <button key={option.option} onClick={() => handleOptionClick(option)}>
                                {option.option}
                            </button>
                        )
                    })}
                    <p>Score: {score}</p>
                </div>
            </div>
        )
    } else {
        return null
    }
}
