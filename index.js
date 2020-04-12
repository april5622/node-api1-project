const express = require("express")
const db = require("./database")

const server = express()
server.use(express.json())

// PUT for 400 & 201
server.post("/api/users", (req, res) => {
    //500

    if(req.body.name || req.body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user",
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
    })
    res.status(201).json(newUser)
})


//GET for 500 /api/users
server.get("/api/users", (req, res) =>{
    const users = db.getUsers(req.params.id)

    if(users){
        res.json(users)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
    
})

//GET for 404 & 500 /api/users/:id
server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

    if(user){
        res.json(user)
    }else{
        res.status(404).json({
            errorMessage: "The user with the specified ID does not exist.",
        })
    }
    //500
})

//DELETE for 404 & 500 /api/users/:id
server.delete("/api/users/:id", (req, res) =>{
    const user = db.getUserById(req.params.id)

    if(user){
        db.deleteUser(user.id)
        res.json(user)
    }else{
        res.status(404).json({
            errorMessage:"The user with the specified ID does not exist."
        })
    }
    //500
})

//PUT for 404, 400, 500, 200 for /api/users/:id
server.put("/api/users/:id", (req, res) => {
    if(req.body.name || req,body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    const user = db.getUserById(req.params.id)

    if(user){
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
        })
        res.status(200).json(updatedUser)
    } else {
        res.status(404).json({
            errorMessage: "The user with the specified ID does not exist"
        })
    }
    //500
})

server.listen(5000, ()=>{
    console.log("Server is running on port 5000...");
});