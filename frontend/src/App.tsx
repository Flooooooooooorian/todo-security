import {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import TodoColumn from "./TodoColumn.tsx";
import {allPossibleTodos} from "./TodoStatus.ts";

function App() {

    const [todos, setTodos] = useState<Todo[]>()

    function fetchTodos() {
        axios.get("/api/todo")
            .then(response => {
                setTodos(response.data)
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
                {
                    allPossibleTodos.map(status => {
                        const filteredTodos = todos.filter(todo => todo.status === status)
                        return <TodoColumn status={status} todos={filteredTodos} onNewTodoItemSaved={fetchTodos}/>
                    })
                }
            </div>
        </>
    )
}

export default App
