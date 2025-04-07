const Todo=require('../model/Todo')

const addTodo=async(req,res)=> {
    try {
        const {todo}=req.body
        const todoItem=new Todo({
            todo
        })
        await todoItem.save()
        res.status(200).json(await Todo.find())
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:"server error"})
    }
}

const getTodos=async(req,res)=> {
    try {
        const todos=await Todo.find()
        res.status(200).json(todos)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:"server error"})
    }
}

const updateTodo=async(req,res)=> {
    try {
        const {todo}=req.body
        const myTodo=await Todo.findByIdAndUpdate(req.params.id,{todo})
        res.status(200).json(await Todo.find())
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:"server error"})
    }
}

const deleteTodo=async(req,res)=> {
    try {
        const todo=await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json(await Todo.find())
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message:"server error"})
    }
}

module.exports={addTodo,getTodos,updateTodo,deleteTodo}