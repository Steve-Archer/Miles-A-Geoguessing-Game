import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Header from './Header'

const End = () => {
    let[loggedInUser, setLoggedInUser] = useState({})
    let[topUsers, setTopUsers] = useState([])
    const history = useHistory()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/loggedInUser", {withCredentials:true})
            .then(res=>{
                console.log("response on logged in user -->", res)
                if(res.data.results) {
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err=>{
                console.log("error on logged in user -->", err)
                history.push("/")
            })
        
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users")
            .then(res=>{
                console.log(res.data.results)
                setTopUsers(res.data.results.sort((a,b)=>a.score - b.score).slice(0, 10))
            })
    }, [])
    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                
                history.push("/")
            })
            .catch(err=>console.log(err))
    }
    const play = () => {
        history.push("/play")
    }
    return (
        <div className="container">
            <div className="logout-box container">
                <button id="logout" onClick = {logout} className="btn btn-danger">Logout</button>
            </div>
            <Header></Header>
            <div className="info-box container">
                <h3>Player: {loggedInUser.name}</h3>
                <h5>BestScore: {loggedInUser.score}</h5>
            </div>
            <div className = "d-flex justify-content-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topUsers.map((user, i)=>{
                            return(
                                
                                <tr key = {i}>
                                    <td>{i+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.score}</td>
                                </tr>
                                
                                
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className= "container play-box">
                <button onClick = {play} className="btn btn-primary">Play Again</button>
            </div>
        </div>
    )
}
export default End