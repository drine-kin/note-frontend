import React from 'react'

const LoginForm = ({
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <div>
                username
                <input type="text" value={username} name="username" id="username" onChange={handleUsernameChange}/>
            </div>
            <div>
                passowrd
                <input type="password" value={password} name="password" id="password" onChange={handlePasswordChange}/>
            </div>
            <button type="submit" id="login-button">Login</button>
            </form>
      </div>
    )
}

export default LoginForm
