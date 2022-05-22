import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
const LoginRegister = () => {

    return (
        <div className="row m-5">
            <div className="col m-5">
                <LoginForm></LoginForm>
            </div>
            <div className="col m-5">
                <RegisterForm></RegisterForm>
            </div>
        </div>
    )
}
export default LoginRegister