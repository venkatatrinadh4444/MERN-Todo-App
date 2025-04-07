const express=require('express')
const routes=express.Router()
const {addTodo,getTodos,updateTodo,deleteTodo}=require('../controllers/todoControllers')

routes.post('/add-todo',addTodo)
routes.get('/all-todos',getTodos)
routes.put('/update-todo/:id',updateTodo)
routes.delete('/delete-todo/:id',deleteTodo)

module.exports=routes