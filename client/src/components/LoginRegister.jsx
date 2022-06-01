import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Header from './Header'
const LoginRegister = () => {

    return (
        <div className="container">
            <Header></Header>
            <div className="container row">
                <div className="col logreg">
                    <LoginForm></LoginForm>
                </div>
                <div className="col logreg">
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        </div>
        
    )
}
export default LoginRegister