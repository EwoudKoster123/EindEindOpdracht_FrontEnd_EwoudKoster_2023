import React, { useContext, useState } from 'react';
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../auth context/AuthContext";
import './Login.module.css';


function LoginPage() {
    const { login } = useContext(AuthContext);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    function RedirectButton() {
        const history = useHistory();
    }

    function handleRedirect() {
        history.push('/profile');
    }

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

                <button className="login-button" type="button" onClick={handleRedirect}>
                    Login
                </button>

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
