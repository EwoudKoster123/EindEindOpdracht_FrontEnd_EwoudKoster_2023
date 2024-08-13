import React, { useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": userName,
                "password": password,
            });
            login(response);
            history.push("/profile");
        } catch (e) {
            console.error(e.response);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="login-username">
                    Username:
                    <Input
                        type="text"
                        id="login-username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Fill in your username"
                    />
                    {userName.length < 6 && <ErrorMessage>Your username isn't long enough</ErrorMessage>}
                    {userName.length >= 6 && <GoodMessage>Your username is long enough</GoodMessage>}
                </Label>

                <Label htmlFor="login-password">
                    Password:
                    <Input
                        type="password"
                        id="login-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Fill in your password"
                    />
                    {password.length < 6 && <ErrorMessage>Your password isn't long enough</ErrorMessage>}
                    {password.length >= 6 && <GoodMessage>Your password is long enough</GoodMessage>}
                </Label>

                <Button type="submit">Login</Button>
            </Form>

            <SignupPrompt>Heeft u geen account? <StyledLink to="/signup">Signup</StyledLink> dan.</SignupPrompt>
        </>
    );
}

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

const SignupPrompt = styled.p`
    margin-top: 1rem;
    text-align: center;
`;

const StyledLink = styled(Link)`
    color: #007BFF;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export default LoginPage;
