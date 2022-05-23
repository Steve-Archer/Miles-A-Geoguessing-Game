const Game = require("../models/game.model")
const Location = require("../models/location.model")
const fetch = require('node-fetch')

module.exports = {
    makeGame: (req, res) => {
        let array = [[0]]

        for(let i=1;i<=10;i++){
            let num1 = Math.ceil(Math.random()*10)
            let num2 = Math.ceil(Math.random()*10)
            while(num1==num2){
                num2 = Math.ceil(Math.random()*10)
            }
            array.push([num1,num2])
            Location.findOne({id:num1})
                .then(loc=>{
                    array[i].push(loc)
                })
                .catch(err=>console.log("error -->", err))
            Location.findOne({id:num2})
                .then(loc=>{
                    array[i].push(loc)
                })
                .catch(err=>console.log("error -->", err))    
        }
        console.log(array)
        Game.create({rounds:array})
            .then(game=>res.json({game:game}))
            .catch(err=>console.log("error -->", err))
        
    },
    round: (req, res) => {
        let q1 = req.body.rounds[req.params.round][2].qCode
        let q2 = req.body.rounds[req.params.round][3].qCode
        let temp = req.body
        const URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" + q1 + "/distance?toCityId=" + q2 + "&distanceUnit=MI"
        const options = {
            method: "GET",
            headers: {
            "x-rapidapi-host": process.env.API_KEY,
            "x-rapidapi-key": process.env.API_PASSWORD
            }
        }
        console.log("temp", temp)
        console.log(URL)
        fetch(URL, options)
            .then(result=>result.json())
            .then(json=>{
                temp.rounds[req.params.round].push(json.data)
                Game.findOneAndUpdate(
                    {_id:req.params.id},
                    temp,
                    {new:true, runValidators:true}        
                    )
                        .then(game=>{
                            console.log("game ->",game)
                        })
                        .catch(err=>console.log(err))
                            console.log(err)
                        })
            .catch(err=>{
                console.log("error on round --- probably 403", err)
            })
    },
    getGame: (req, res) => {
        console.log("testing", req.params.id)
        Game.findOne({_id: req.params.id})
            .then(game=>{
                res.json({game:game})
            })
            .catch(err=>console.log(err))
    },
    endGame: (req, res) => {
        Game.deleteOne({_id: 1})
    }
}