import React from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect,useRef } from "react";
import noTodosImg from './assets/no-todos.jpg'
import axios from "axios";
import { API_URI } from "./Api";

const App=()=> {
  const [todos,setTodos]=useState([])
  const [isEdit,setIsEdit]=useState({id:'',edit:false})
  const todoInput=useRef(null)

  useEffect(()=> {
    axios.get(`${API_URI}/todos/all-todos`).then(response=>setTodos(response.data)).catch(err=>console.log(err))
    todoInput.current.focus()
  },[])


  const addTodos=()=> {
    const inputValue=todoInput.current.value;
    if(!inputValue) {
      alert('Please add some data to add todo')
      return;
    }
    const newTodo={todo:inputValue}
    axios.post(`${API_URI}/todos/add-todo`,newTodo).then(response=>setTodos(response.data)).catch(err=>console.log(err))
    todoInput.current.value=""
  }

  const deleteTodo=(id)=> {
    axios.delete(`${API_URI}/todos/delete-todo/${id}`).then(response=>setTodos(response.data)).catch(err=>console.log(err))
  }

  const editTodo=(id,todoData)=> {
    todoInput.current.focus()
    setIsEdit({...isEdit,id,edit:true})
    todoInput.current.value=todoData
  }
  
  const editBtnHandler=()=> {
    const {id}=isEdit
    const inputValue=todoInput.current.value
    if(!inputValue) {
      alert('please enter some data to add todo');
      return;
    }
    const newTodo={todo:inputValue}
    axios.put(`${API_URI}/todos/update-todo/${id}`,newTodo).then(response=>setTodos(response.data)).catch(err=>console.log(err))
    setIsEdit({id:'',edit:false})
    todoInput.current.value=""
  }

  return (
    <div>
      <h1 className="text-center mt-3 mb-3 text-primary">Todo Application</h1>
      <form onSubmit={(e)=>e.preventDefault()} className="mb-3">
        <div className="d-flex w-75 m-auto">
        <input ref={todoInput} type="text" placeholder="Add a todo item" className="form-control"/>
        {isEdit.edit?<button className="btn btn-success px-4" onClick={editBtnHandler}>Edit</button>:<button className="btn btn-success px-4" onClick={addTodos}>Add</button>}
        </div>
      </form>

      {todos.length>0?(
        todos.map(eachTodo=>{
          return (
            <div key={eachTodo._id} className="d-flex justify-content-between align-items-center container mb-2 itemContainer shadow rounded-2 p-2">
        <div>{eachTodo.todo}</div>
        <div className="d-flex">
          <button className="btn" onClick={()=>editTodo(eachTodo._id,eachTodo.todo)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>
          <button className="btn" onClick={()=>deleteTodo(eachTodo._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
      </div>
          )
        })
      ):<div className="text-center">
        <img src={noTodosImg} alt="noTodos" width="280px"height="220px" className="rounded-1 mt-3"/>
        <h3 className="text-secondary mt-2">No Todos Found</h3>
        <p className="text-secondary">Add a new todo item...</p>
        </div>}
    </div>
  )
}

export default App