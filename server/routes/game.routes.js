const GameController = require('../controllers/game.controller')

module.exports = (app)=>{
    app.post("/api/game/new", GameController.makeGame)
    app.put("/api/game/:id/:round", GameController.round)
    app.delete("/api/game/:id", GameController.deleteGame)
}