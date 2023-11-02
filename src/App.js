import './App.css';
import React, { useState, useEffect } from 'react';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  let initTodo; 
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));//retireves string from localstorage converts into object 
  }
  
  const [todos, setTodos] = useState(initTodo);
  
  const onDelete = (todo) => {
    console.log("I am on delete of todo", todo);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));//stores the converted string  in local storage
  }
  
  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); //stores the converted string  in local storage
  }, [todos])
  return (
    <div className="App">
     <Router>
      <Header title="My Todos List" searchBar={false} /> 
      <Routes>
          <Route exact path="/" 
            element={
            <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
            </>} /> 
          <Route exact path="/about" element={<About />}/>
        </Routes> 
      <Footer />
    </Router>
      
    </div>
  );
}

export default App;
