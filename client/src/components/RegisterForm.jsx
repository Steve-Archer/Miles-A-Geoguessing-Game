import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const RegisterForm = () => {

    let [name, setName] = useState("")
    let [password, setPassword] = useState("" )
    let [confirm, setConfirm] = useState("")
    let [score, setScore] = useState(50000)
    let [formErrors, setFormErrors] = useState({})
    const history = useHistory()


    const register = (e) => {
        e.preventDefault()
        let formInfo = {name, password, confirm, score}
        axios.post('http://localhost:8000/api/users/register', formInfo, {withCredentials:true})
            .then(res=>{
                console.log(res)
                if(res.data.errors){
                    setFormErrors(res.data.errors)
                }
                else{
                    history.push('/dashboard')
                }
            })
            .catch(err=>{
                console.log('error: ', err)
            })
    } 

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={register}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" onChange = {(e) => setName(e.target.value)}/>
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange = {(e) => setPassword(e.target.value)}/>
                    <p className="text-danger">{formErrors.password?.message}</p>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirm" className="form-control" onChange = {(e) => setConfirm(e.target.value)}/>
                    <p className="text-danger">{formErrors.confirm?.message}</p>
                </div>
                <input type="hidden" name="score" value="50000"/>
                <input type="submit" value="Register" className="btn btn-primary mt-3" />
            </form>
        </div>
    )
}
RegisterForm.propTypes = {}

export default RegisterForm