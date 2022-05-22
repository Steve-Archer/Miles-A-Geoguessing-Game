const { login } = require("../controllers/user.controller")
const UserController = require("../controllers/user.controller")

module.exports = (app)=>{
    app.get("/api/users", UserController.getAllUsers)
    app.post("/api/users/register", UserController.register)
    app.post("/api/users/login", UserController.login)
    app.get("/api/users/loggedInUser", UserController.getLoggedInUser)
    app.get("/api/users/logout", UserController.logout)
    app.put("/api/users/end/:id", UserController.endGame)
}