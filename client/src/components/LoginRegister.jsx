import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Header from './Header'
const LoginRegister = () => {

    return (
        <div className="container">
            <Header></Header>
            <div className="container logreg-box">
                <div className="logreg">
                    <LoginForm></LoginForm>
                </div>
                <div className="logreg">
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        </div>
        
    )
}
export default LoginRegister