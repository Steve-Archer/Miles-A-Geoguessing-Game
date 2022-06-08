const Location = require("../models/location.model")
const axios = require('axios')


module.exports = {
    getAllLocations: (req, res)=> {
        Location.find()
            .then(allLocations=>{
                res.json({results: allLocations})
            })
            .catch(err=>json({error: err}))
    },
    createLocation: (req, res)=> {
        Location.create(req.body)
            .then(location=>console.log("new location -->", location))
            .catch(err=>console.log(err))
    },
    findOne: (req, res) => {
        Location.findOne({id: req.params.id})
            .then(loc=>{
                res.json({results:loc})
            })
            .catch(err=>console.log(err))
    },
    apiFetch: (req, res) => {
        console.log("testing")
        let qOne = req.params.qOne
        let qTwo = req.params.qTwo
        let fetchString = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/" + qOne + "/distance?toCityId=" + qTwo + "&distanceUnit=MI"
        axios.get(fetchString, {
            "headers": {
            "x-rapidapi-host": process.env.API_KEY,
            "x-rapidapi-key": process.env.API_PASSWORD
            }
        })
            .then(json=>{
                res.json(json.data)
            })
            .catch(err=>console.log(err))
    }
}