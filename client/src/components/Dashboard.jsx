import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'


const Dashboard = () => {

    let[loggedInUser, setLoggedInUser] = useState({})
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
    const game = () => {
        history.push("/play")
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
            <h3>Welcome {loggedInUser.name}</h3>
            <div className="mt-3">
                <button onClick={game} className= "btn btn-primary">Play Game</button>
            </div>
            <div className="mt-3">
                <button onClick = {logout} className="btn btn-info">Logout</button>
            </div>
        </div>
    )
}

export default Dashboard