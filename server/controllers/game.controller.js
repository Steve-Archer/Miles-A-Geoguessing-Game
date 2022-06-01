const Game = require("../models/game.model")
const Location = require("../models/location.model")
const fetch = require('node-fetch')
const { response } = require("express")

module.exports = {
    makeGame: (req, res) => {
        let array = [[0]]

        for(let i=1;i<=10;i++){
            let num1 = Math.ceil(Math.random()*74)
            let num2 = Math.ceil(Math.random()*74)
            while(num1==num2){
                num2 = Math.ceil(Math.random()*74)
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
                            res.json({game:game})
                        })
                        .catch(err=>console.log(err))
            })
            .catch(err=>{
                console.log(err)
            })
    },
    deleteGame: (req, res) => {
        Game.deleteOne({_id: req.params.id})
            .then(result=> res.json({result: result}))
            .catch(err=> response.json(err))
    }
}