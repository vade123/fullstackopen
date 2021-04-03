import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client'
const Login = ({ show, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const LOGIN = gql`
    mutation login(
        $username: String!,
        $password: String!) {
            login(
                username: $username,
                password: $password
            ) { value }
        }
    `
    const [login, result] = useMutation(LOGIN, {
        onError: (err) => { console.log(err.graphQLErrors[0].message)}
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    const handleLogin = async (event) => {
        event.preventDefault()

        login({ variables: { username, password }})
    }
    if (!show) {
        return null
    }
    return (
        <div> 
            <form onSubmit = {handleLogin}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
             <div>
                password
                <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
                <button id="login-button" type="submit">login</button>
            </div>
            </form>
        </div>
    )
}
export default Login;