import {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import TodoGallery from "./TodoGallery.tsx";
import NewTodoCard from "./NewTodoCard.tsx";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {

    const [todos, setTodos] = useState<Todo[]>()
    const [user, setUser] = useState<string>()

    useEffect(() => {
        getUser()
    }, []);

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => getUser())
    }

    function getUser() {
        axios.get("/api/users/me")
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
    }

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
            <button onClick={login}>Login</button>
            <button onClick={getUser}>Me</button>
            <button onClick={logout}>Logout</button>
            <p>{user}</p>
            <h1>TODOs</h1>
            <Routes>
                <Route path={"/todos"} element={<TodoGallery todos={todos}
                                                             addTodo={addTodo}
                                                             deleteTodo={deleteTodo}
                                                             updateTodo={updateTodo}/>}/>
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path={"/todos/add"} element={<NewTodoCard onTodoItemAdd={addTodo}/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
