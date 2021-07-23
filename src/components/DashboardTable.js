import React from 'react'
import { Table } from 'react-bootstrap'

export default function DashboardTable({ userData, subject }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                {userData.scores.map((score, index) => {
                    if (score.subject === subject.label) {
                        return (
                            <tr key={score.date + index}>
                                <td>{index + 1}</td>
                                <td>{new Date(score.date * 1000).toDateString()}</td>
                                <td>{score.subject}</td>
                                <td>{score.score}</td>
                                <td>{score.difficulty}</td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </Table>
    )
}
