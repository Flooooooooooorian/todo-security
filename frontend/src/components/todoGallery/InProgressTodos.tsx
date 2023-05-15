import React from 'react';
import {TodoModel} from "../todoModel/TodoModel";
import TodoCard from "../todoCard/TodoCard";

type Props = {
    todos:TodoModel[]
    getTodos: () => void
}

function InProgressTodos(props:Props) {
    return (
        <div>
            {props.todos.map(todo => <TodoCard todo={todo} getTodos={props.getTodos}/>)}
        </div>
    );
}

export default InProgressTodos;