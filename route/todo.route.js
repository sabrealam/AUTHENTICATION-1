const todoRouter = require("express").Router();
const Todo = require("../model/todosModel");
const auth = require("../middlewere/auth");

todoRouter.get(`/` , auth,  async (req, res) => {
 
    const todo = await Todo.find({UserID : req.UserID});
    res.json({todos : todo});
});
 

todoRouter.post("/create", auth, async (req, res) => { 
    let { title, description ,  } = req.body; 
    console.log( req.UserID);
    try {
        let todo = await Todo.create({title, description , UserID : req.UserID});
        todo = await todo.save();
        res.json({message : `Todo created successfully`, todo : todo , data : req.user});
    } catch (error) {
        res.status(500).send({def : `From Catch --> Create` , error : error.message});
    }
})

todoRouter.put("/update/:id", auth, async (req, res) => {
    let { id } = req.params;
    let { title, description } = req.body;
    try {
        let todo = await Todo.findOne({UserID : id});
        if( todo.UserID != req.UserID) return res.status(400).send({message : `Unauthorized access`});
        todo = await Todo.updateOne({UserID : id} , {title, description});
        res.json({message : `Todo updated successfully`, todo : todo});
    } catch (error) {
        res.status(500).send({def : `From Catch --> Update` , error : error.message});
    }
})
todoRouter.delete("/delete/:id", auth, async (req, res) => {
    let { id } = req.params;
    try {
        let todo = await Todo.findOne({UserID : id});
        if( todo.UserID != req.UserID) return res.status(400).send({message : `Unauthorized access`});
        todo = await Todo.deleteOne({UserID : id});
        res.send({message : `Todo deleted successfully`, todo : todo});
    } catch (error) {
        res.status(500).send({def : `From Catch --> Delete` , error : error.message});
    }
})
module.exports = todoRouter