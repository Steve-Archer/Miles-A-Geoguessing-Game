import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

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
            if(clock==1){
                console.log("game -->", game)
                let guess = document.getElementById("guess").value
                setDifference(Math.abs(Math.floor(game.rounds[round][4])-guess))
                
                
            }
            if(clock==0&&round!=0&&onClick==true){
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
        setClock(8)
        setOnClick(true)
        setDifference(0)
        setRound(round+1)
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
        <div className="m-3">
            <div className="d-flex justify-content-end">
                <button onClick = {logout} className="btn btn-info">Logout</button>
            </div>
            <div className="d-flex justify-content-center">
                <div className=" border border-dark w-25">
                    <h5>Player: {loggedInUser.name}</h5>
                    <h5>Score: {score}</h5>
                    <h5>Round: {round}</h5>
                </div>
                
            </div>
            
            {round!=0?
            <div className="d-flex justify-content-around m-5">
                <div className="col m-3">
                    <h5>{game.rounds[round][2].city} {game.rounds[round][2].state}</h5>
                </div>
                <div className="col">
                    <h3>Clock</h3>
                    <h3 id="clock">{clock}</h3>
                </div>
                <div className="col m-3">
                    <h5>{game.rounds[round][3].city} {game.rounds[round][3].state}</h5>
                </div>
            
            </div>
            :null}
            <div className="row">
                <div className="col">
                </div>
                <div className="col d-flex justify-content-center">
                    <input type="number" name="guess" id="guess" className="form-control w-50" />
                </div>
                <div className="col">
                </div>
            </div>
            {clock==0&&round!=0?
                <div>
                    <div className="d-flex justify-content-center mt-3">
                        <p><span id="answer"></span></p>
                    </div>
                    <div>
                        {round!=10?<button onTouchStart={play} onClick={play} className="btn btn-info mt-3">play</button>:null}
                    </div>
                </div>:null}
            {onClick==false&&round==10?
                <div>
                    <p>Your Total score was {score}</p>
                    <button onTouchStart={endGame} onClick={endGame} className="btn btn-info mt-3">end game</button>
                </div>:null}
            {round==0?<button onTouchStart={play} onClick={play} className="btn btn-info mt-3">play</button>:null}
            {onClick==false&&round==0?<p className ="mt-2">Click play to begin the game.</p>:null}
        </div>
    )
}
export default Game