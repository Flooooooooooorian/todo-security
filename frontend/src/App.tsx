import {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes} from "react-router-dom";
import Page from "./Page.tsx";
import TodoColumn from "./TodoColumn.tsx";

function App() {

    const [todos, setTodos] = useState<Todo[]>()

    function fetchTodos() {
        axios.get("/api/todo")
            .then(response => {
                setTodos(response.data)
            })
    }

    function addTodo(text: string) {
        axios.post("/api/todo",
            {
                description: text,
                status: "OPEN",
            } as Todo)
            .then((response => {
                if (todos) {
                    setTodos([...todos, response.data])
                }
            }))
    }

    function deleteTodo(id: string) {
        axios.delete("/api/todo/" + id)
            .then(() => {
                setTodos(todos?.filter((todo) => todo.id !== id))
            })
    }

    function updateTodo(todo: Todo) {
        axios.put("/api/todo/" + todo.id, todo)
            .then(response => {
                setTodos(todos?.map(currentTodo => currentTodo.id === todo.id ? response.data : currentTodo))
            })
    }

    useEffect(fetchTodos, [])

    if (!todos) {
        return "Lade..."
    }

    return (
        <>

            <h1>TODOs</h1>
            <div>
                <Link className="nav-link" to={"/"}>Home</Link> <Link className="nav-link" to={"/open"}>Open</Link><Link
                className="nav-link" to={"/in_progress"}>InProgress</Link><Link className="nav-link"
                                                                                to={"/done"}>Done</Link>
            </div>
            <div className="page">
                <Routes>
                    <Route index element={<Page todos={todos}
                                                onTodoItemAdd={addTodo}
                                                onTodoItemDelete={deleteTodo}
                                                onTodoItemUpdate={updateTodo}/>}/>

                    <Route path="/open" element={<TodoColumn todos={todos.filter(t => t.status === "OPEN")}
                                                             status={"OPEN"}
                                                             onTodoItemAdd={addTodo}
                                                             onTodoItemDelete={deleteTodo}
                                                             onTodoItemUpdate={updateTodo}/>}/>
                    <Route path="/in_progress"
                           element={<TodoColumn todos={todos.filter(t => t.status === "IN_PROGRESS")}
                                                status={"IN_PROGRESS"}
                                                onTodoItemAdd={addTodo}
                                                onTodoItemDelete={deleteTodo}
                                                onTodoItemUpdate={updateTodo}/>}/>

                    <Route path="/done" element={<TodoColumn todos={todos.filter(t => t.status === "DONE")}
                                                             status={"DONE"}
                                                             onTodoItemAdd={addTodo}
                                                             onTodoItemDelete={deleteTodo}
                                                             onTodoItemUpdate={updateTodo}/>}/>

                </Routes>
            </div>
        </>
    )
}

export default App
