import {Todo} from "./Todo.ts";
import TodoCard from "./TodoCard.tsx";

function App() {

    const todos: Todo[] = [
        {
            "id": "abc123",
            "description": "kochen",
            "status": "OPEN"
        },
        {
            "id": "abc124",
            "description": "putzen",
            "status": "OPEN"
        }
    ]

    return (
        <>
            <h1>TODOs</h1>
            {
                todos.map(todo => <TodoCard todo={todo} key={todo.id} />)
            }
        </>
    )
}

export default App
