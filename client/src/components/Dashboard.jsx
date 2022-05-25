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
            <div className = "mt-3">
                <p>Estimate in miles the geographical distance between two cities</p>
                <p>Distances are based on exact geographical locations</p>
                <p>10 round game - round ends when the clock expires </p>
                <p>What is in the guess box when the round ends is your guess</p>
                <p>There are 101 cities with 5,050 combinations to match two cities</p>
            </div>
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