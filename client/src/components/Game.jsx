import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Header from './Header'

const Game = () => {
    let [loggedInUser, setLoggedInUser] = useState({})
    let [game, setGame] = useState([])
    let [onClick, setOnClick] = useState(false)
    let [clock, setClock] = useState(0)
    let [score, setScore] = useState(0)
    let [round, setRound] = useState(0)
    let [difference, setDifference] = useState(0)
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
    useEffect(() => {
        axios.post("http://localhost:8000/api/game/new")
            .then(res=>{
                console.log(res)
                setGame(res.data.game)
            })
            .catch(err=>console.log("error --->", err))
    },[])

    useEffect(()=> {
        setTimeout(()=> {   
            if(clock===1){
                console.log("game -->", game)
                let guess = document.getElementById("guess").value
                setDifference(Math.abs(Math.floor(game.rounds[round][4])-guess))
                
                
            }
            if(clock===0&&round!=0&&onClick===true){
                document.getElementById("answer").innerHTML = "The distance is " + Math.floor(game.rounds[round][4]) + " miles. Your score for round " + round + " is " + difference + "."
                setScore(score+difference)
                setOnClick(false)
            }
            if(clock>0){
                setClock(clock-1)
            }
        }, 1000)
    },)
    const play = (e) => {
        console.log(game)
        e.preventDefault()
        axios.put(`http://localHost:8000/api/game/${game._id}/${round+1}`, game)
        .then(res=>{
            setGame(res.data.game)
        })
        .catch(err=>console.log(err))
        setClock(5)
        setOnClick(true)
        setDifference(0)
        setRound(round+1)
        document.getElementById("guess").value = ""
        document.getElementById("guess").focus()
    }
    const endGame = (e) => {
        e.preventDefault()
        if(score < loggedInUser.score){
            let userObject = loggedInUser
            userObject.score = score
            axios.put(`http://localhost:8000/api/users/end/${loggedInUser._id}`, userObject)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>console.log(err))
        }
        axios.delete(`http://localhost:8000/api/game/${game._id}`)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        history.push("/end")
    }
    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                
                history.push("/")
            })
            .catch(err=>console.log(err))
    }

    return (
        <div className="container game">
            <div className = "container logout-box">
                <button id="logout" onClick = {logout} className="btn btn-danger">Logout</button>
            </div>
            <Header></Header>
            <div className="container info-box">
                <h5>Player: {loggedInUser.name}</h5>
                <h5>Score: {score}</h5>
                <h5>Round: {round}</h5>
            </div>
            {round==0?
                <div className="container rule-box">
                    <ul>
                        <li>Estimate in miles the geographical distance between two cities</li>    
                        <li>Distances are based on exact geographical locations</li>
                        <li>10 round game - round ends when the 15 second clock expires</li>
                        <li>What is in the guess box when the round ends is your guess</li>
                    </ul>
                </div>
            :null}
            {round!=0?
            <div className="container clock-box">
                    <h2 id="clock">{clock}</h2>
            </div>:null}
            {round!=0?
            <div className="container game-box">
                <div className="location">
                    <h5>{game.rounds[round][2].city} {game.rounds[round][2].state}</h5>
                </div>
                <div className="location">
                    <h5>{game.rounds[round][3].city} {game.rounds[round][3].state}</h5>
                </div>
            
            </div>
            :null}
            {round!=0?
                <div className="guess-box">
                    <input type="number" autofocus="true" name="guess" id="guess" className="form-control"/>
                </div>:null}
            
            {clock==0&&round!=0&&round!=10&&difference!=0?
                <div className="container play-box">
                    <button onClick={play} className="play btn btn-primary">play</button>
                </div>:null}
            {clock==0&&round!=0?
            <div>
                <div className="container answer-box">
                    <p><span id="answer"></span></p>
                </div>
            </div>:null}
            {onClick==false&&round==10?
                <div className="end-game">
                    <p>Your Total score was {score}</p>
                    
                </div>:null}
            {onClick==false&&round==10?
                <div className="end-game">
                    <button onClick={endGame} className="btn btn-info">end game</button>
                </div>:null}
            {onClick==false&&round==0?
            <div className="container click-play">
                <p>Click play to begin the game.</p>
            </div>:null}
            {round==0?
            <div className="container play-box">
                <button onClick={play} className="play btn btn-primary">Play</button>
            </div>:null}
        </div>
    )
}
export default Game