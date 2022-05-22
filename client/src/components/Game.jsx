import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

const Game = () => {
    let[loggedInUser, setLoggedInUser] = useState({})
    let [clock, setClock] = useState(0)
    let [score, setScore] = useState(0)
    let [onClick, setOnClick] = useState(false)
    let [round, setRound] = useState(0)
    let [answer, setAnswer] = useState(0)
    let [difference, setDifference] = useState(0)
    let [locationOne, setLocationOne] = useState({
        id: 0,
        qCode: "",
        city: "",
        state: ""
    })
    let [locationTwo, setLocationTwo] = useState({
        id: 0,
        qCode: "",
        city: "",
        state: ""
    })
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

    useEffect(()=> {
        let timeout = setTimeout(()=> {
            
            if(clock>0){
                setClock(clock-1)
            }
            if(clock==4){
                axios.get(`http://localhost:8000/api/locations/${locationOne.qCode}/api/${locationTwo.qCode}`)
                    .then(res=>{
                        console.log("api response", res)
                        setAnswer(Math.floor(res.data.data))
                    })
                    .catch(err=>console.log("error -->", err))
            }
            if(clock==1){
                let guess = document.getElementById("guess").value
                setDifference(Math.abs(answer-guess))
                
                
            }
            if(clock==0&&round!=0&&onClick==true){
                document.getElementById("answer").innerHTML = "The distance is " + answer + " miles. Your score for round " + round + " is " + difference + "."
                console.log(answer)
                setScore(score+difference)
                setOnClick(false)
            }
        }, 1000)
    },)
    const play = () => {
        console.log(loggedInUser)
        setRound(round+1)
        setClock(15)
        setOnClick(true)
        setAnswer(0)
        setDifference(0)
        let num1 = Math.ceil(Math.random()*10)
        let num2 = Math.ceil(Math.random()*10)
        while(num1==num2){
            num2 = Math.ceil(Math.random()*10)
        }
        
        axios.get(`http://localhost:8000/api/locations/find/${num1}`)
            .then(res=>{
                setLocationOne(res.data.results)
            })
            .catch(err=>console.log(err))
        axios.get(`http://localhost:8000/api/locations/find/${num2}`)
            .then(res=>{
                setLocationTwo(res.data.results)
            })
            .catch(err=>console.log(err))
    }
    const endGame = (e) => {
        e.preventDefault()
        if(score < loggedInUser.score){
            let userObject = loggedInUser
            userObject.score = score
            console.log(userObject)
            axios.put(`http://localhost:8000/api/users/end/${loggedInUser._id}`, userObject)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>console.log(err))
        }
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
            
            <div className="d-flex justify-content-around m-5">
                <div className="col m-3">
                    <h5>{locationOne.city} {locationOne.state}</h5>
                </div>
                <div className="col">
                    <h3>Clock</h3>
                    <h3 id="clock">{clock}</h3>
                </div>
                <div className="col m-3">
                    <h5>{locationTwo.city} {locationTwo.state}</h5>
                </div>
            </div>
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