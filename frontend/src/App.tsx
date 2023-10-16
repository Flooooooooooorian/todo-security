import {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import TodoColumn from "./TodoColumn.tsx";
import {allPossibleTodos} from "./TodoStatus.ts";

function App() {

    const [todos, setTodos] = useState<Todo[]>()


    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080": window.location.origin

        window.open(host + '/oauth2/authorization/github', '_blank')
    }

    function me() {
        axios.get("/api/users/me")
            .then(response => {
                console.log(response.data)
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
            <div className="page">
                <h1>TODOs</h1>
                <button onClick={login}>Login with Github</button>
                <button onClick={me}>Me</button>
                {
                    allPossibleTodos.map(status => {
                        const filteredTodos = todos.filter(todo => todo.status === status)
                        return <TodoColumn
                            status={status}
                            todos={filteredTodos}
                            onTodoItemAdd={addTodo}
                            onTodoItemDelete={deleteTodo}
                            onTodoItemUpdate={updateTodo}
                            key={status}
                         />
                    })
                }
            </div>
        </>
    )
}

export default App
