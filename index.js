const express = require("express")
const db = require("./database")

const server = express()
server.use(express.json())

// PUT for /api/users 400, 201, 500 
server.post("/api/users", (req, res) => {
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user",
        })
    }
    
    db.createUser(req.params.id)
        .then((user)=> {
            res.status(201).json(user)
        })
        .catch((error)=> {
            console.log(error)
            res.status(500).json({
                errorMessage: "There was an error while saving the user to the database."
            })
        })
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
    db.getUserById(req.params.id)
        .then((user) => {
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({
                    errorMessage:"The user with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The user information could not be retrieved."
            })
        })
})

//DELETE for 404 & 500 /api/users/:id
server.delete("/api/users/:id", (req, res) =>{ 
    db.deleteUser(req.params.id)
        .then((user) => {
            if(user){
                res.status(200).json(user)
             } else {
                res.status(404).json({
                    errorMessage:"The user with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage:"The user could not be removed"
            })
        })
})

//PUT for 404, 400, 500, 200 for /api/users/:id
server.put("/api/users/:id", (req, res) => {
    if(!req.body.name || !req,body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    
    db.updateUser(req.params.id, req.body)
        .then((user) => {
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({
                    errorMessage: "The user with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The user information could not be modified."
            })
        })

})

server.listen(5000, ()=>{
    console.log("Server is running on port 5000...");
});