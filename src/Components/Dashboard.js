import { Card, Button, Alert } from 'react-bootstrap'

import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';

import {useAuth} from '../contexts/AuthContext';

export function Dashboard() {

    const {currentUser, logout} = useAuth();
    const [error, setError] = useState("");

    const history = useHistory();

    async function handleLogout() {

        try {
            await logout();
            history.push("/login")
        } catch (error) {
            setError("Failed to log out")          
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
