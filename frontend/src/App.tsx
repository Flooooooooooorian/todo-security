import {Todo} from "./Todo.ts";
import TodoCard from "./TodoCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [todos, setTodos] = useState<Todo[]>()

    useEffect(
        () => {
            axios.get("/api/todo")
                .then(response => {
                    setTodos(response.data)
                })
        }, []
    )

    if (!todos) {
        return "Lade..."
    }

    return (
        <>
            <h1>TODOs</h1>
            {
                todos.map(todo => <TodoCard todo={todo} key={todo.id}/>)
            }
        </>
    )
}

export default App
