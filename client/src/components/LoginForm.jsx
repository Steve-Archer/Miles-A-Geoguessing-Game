import React, {useState} from "react"
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const LoginForm = () => {

    let [name, setName] = useState("")
    let [password, setPassword] = useState("")
    let [formErrors, setFormErrors] = useState()
    const history = useHistory()


    const login = (e) => {
        e.preventDefault()
        let formInfo = {name,password}
        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("login response ->", res)
                if(res.data.error){
                    setFormErrors(res.data.error)
                }else{
                    history.push('/dashboard')
                }
            })
            .catch(err=>console.log("login error ->", err))
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                    <p className="text-danger">{formErrors}</p>
                </div>
                <input type="submit" value="Login" className="btn btn-primary mt-3" />
            </form>
        </div>
    )
}
LoginForm.propTypes = {}

export default LoginForm