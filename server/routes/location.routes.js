const LocationController = require("../controllers/location.controller")

module.exports = (app) => {
    app.get("/api/locations", LocationController.getAllLocations)
    app.post("/api/locations/new", LocationController.createLocation)
    app.get("/api/locations/find/:id", LocationController.findOne)
    app.get("/api/locations/:qOne/api/:qTwo", LocationController.apiFetch)
}