import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'


const Dashboard = () => {

    let[loggedInUser, setLoggedInUser] = useState({})
    let [test,setTest] = useState({})
    const history = useHistory()
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/loggedInUser", {withCredentials:true})
            .then(res=>{
                console.log("response on logged in user -->", res)
                if(res.data.results) setLoggedInUser(res.data.results)
            })
            .catch(err=>{
                console.log("error on logged in user -->", err)
                history.push("/")
            })
        
    },[])
    const tester = () => {
        axios.post("http://localhost:8000/api/game/new")
            .then(res=>{
                console.log(res)
                setTest(res.data.game)
                console.log(test)
            })
            .catch(err=>console.log("error --->", err))
    }

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                
                history.push("/")
            })
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1>Welcome {loggedInUser.name}</h1>
            <button onClick = {logout} className="btn btn-info">Logout</button>
            <button onClick = {tester}>button</button>
        </div>
    )
}

export default Dashboard