import React, {ChangeEvent, useState} from 'react';
import {TodoModel} from "../todoModel/TodoModel";
import axios from "axios";
import OpenTodos from "./OpenTodos";
import InProgressTodos from "./InProgressTodos";
import DoneTodos from "./DoneTodos";
import "./TodoGallery.css"

type Props = {
    todos: TodoModel[]
    getTodos: () => void
}

function TodoGallery(props: Props) {

    const [description, setDescription] = useState<string>("")

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }

    function addTodo() {
            axios.post("api/todo", {description: description, status: "OPEN"})
                .then(props.getTodos)
            setDescription("")
    }

    const openSortedTodos = props.todos.filter(todo => todo.status === "OPEN")
    const inProgressSortedTodos = props.todos.filter(todo => todo.status === "IN_PROGRESS")
    const doneSortedTodos = props.todos.filter(todo => todo.status === "DONE")

    return (
        <div>
            <div>
                    <input type="text" value={description} onChange={onChangeHandler}/>
                    <button onClick={addTodo}>SEND IT</button>
                <div className={"todoWrapper"}>
                    <div>
                        <h2>OPEN</h2>
                        <OpenTodos todos={openSortedTodos} getTodos={props.getTodos}/>
                    </div>
                    <div>
                        <h2>IN_PROGRESS</h2>
                        <InProgressTodos todos={inProgressSortedTodos} getTodos={props.getTodos}/>
                    </div>
                    <div>
                        <h2>DONE</h2>
                        <DoneTodos todos={doneSortedTodos} getTodos={props.getTodos}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoGallery;