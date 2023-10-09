import {ChangeEvent, FormEvent, useState} from "react";

type Props = {
    onTodoItemAdd: (text: string) => void,
}

export default function NewTodoCard(props: Props) {

    const [text, setText] = useState("");

    function changeText(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function saveTodo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setText("")
        props.onTodoItemAdd(text)
    }

    return (
        <form onSubmit={saveTodo} className="todo-card new-todo">
            <input type="text" value={text} onInput={changeText}/>
            <button type="submit">Save</button>
        </form>
    );
}
