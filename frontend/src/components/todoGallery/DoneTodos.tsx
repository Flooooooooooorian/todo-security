import {TodoModel} from "../todoModel/TodoModel";
import TodoCard from "../todoCard/TodoCard";
import React from "react";

type Props = {
    todos:TodoModel[]
    getTodos: () => void
}

export default function DoneTodos(props:Props) {
    return (
        <div>
            {props.todos.map(todo => <TodoCard todo={todo} getTodos={props.getTodos}/>)}
        </div>
    );
}