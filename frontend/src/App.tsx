import React, {useEffect, useState} from 'react';
import './App.css';
import TodoGallery from "./components/todoGallery/TodoGallery";
import {TodoModel} from "./components/todoModel/TodoModel";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import TodoDetailsCard from "./components/todoCard/TodoDetailsCard";

function App() {

    const [todos, setTodos] = useState<TodoModel[]>([])

    function getTodos() {
        axios.get("/api/todo")
            .then(response =>
                setTodos(response.data))
            .catch(error => console.log(error.message))
    }

    useEffect(getTodos, [])
    
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    TODO FRONTEND WHOOOP
                </h1>
            </header>
            <Routes>
                <Route path={"/"} element={<TodoGallery getTodos={getTodos} todos={todos}/>} />
                <Route path={"/todos/:id"} element ={<TodoDetailsCard todo={todos}/>}/>
            </Routes>
        </div>
    );
}

export default App;
