import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import './Signup.module.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setRole] = useState('');

    const history = useHistory();

    async function SignUpUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": userName,
                "email": email,
                "password": password,
                "role": [user]
            });
            console.log(response);
            history.push("/login");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Form onSubmit={SignUpUser}>
                <Label htmlFor="email">
                    Email:
                    <Input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Fill in your email"
                    />
                </Label>
                <Label htmlFor="username">
                    Username:
                    <Input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Fill in your username"
                    />
                    {userName.length < 6 && <ErrorMessage>Your username isn't long enough</ErrorMessage>}
                    {userName.length >= 6 && <GoodMessage>Your username is long enough</GoodMessage>}
                </Label>
                <Label htmlFor="password">
                    Password:
                    <Input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Your password"
                    />
                    {password.length < 6 && <ErrorMessage>Your password isn't long enough</ErrorMessage>}
                    {password.length >= 6 && <GoodMessage>Your password is long enough</GoodMessage>}
                </Label>
                <Label htmlFor="role">
                    Role:
                    <Input
                        type="text"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={user}
                        placeholder="user or admin"
                    />
                </Label>
                <Button type="submit">Register</Button>
            </Form>
        </>
    );
}

// Styled components
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
    margin-bottom: 1rem;
    width: 100%;
    max-width: 400px;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
        border-color: #007BFF;
        outline: none;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 0.5rem;
    font-size: 0.9rem;
`;

const GoodMessage = styled.p`
    color: green;
    margin-top: 0.5rem;
    font-size: 0.9rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
`;

export default Signup;
