import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../firebase"
import MultiSelect from "react-multi-select-component";


export default function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const subjectsRef = useRef()

  const { signup, currentUser } = useAuth()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [subjects, setSubjects] = useState([
    { label: "Mathematics", value: 19 },
    { label: "Geography", value: 22 },
    { label: "History", value: 23 },
    { label: "Art", value: 25 }
  ])
  const [selected, setSelected] = useState([])

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      let response = await signup(emailRef.current.value, passwordRef.current.value)
      firestore.collection('users').doc(response.user.uid).set({
        name: nameRef.current.value,
        scores: [],
        subjects: selected
      })

      history.push("/dashboard")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {currentUser && JSON.stringify(currentUser)}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="subjects">
            <Form.Label>Subjects you want practice in</Form.Label>
              <MultiSelect 
              options={subjects}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" style={{ backgroundColor: "#1E0973", marginTop: '20px' }}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}