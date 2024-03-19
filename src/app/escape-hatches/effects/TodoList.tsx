import CheckboxField from "@/app/common/CheckboxField";
import Button from "@/app/common/button";
import TextInput from "@/app/common/textInput";
import { useState } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type NewTodoProps = {
    newId: number;
    onAdd: (newTodo: Todo) => void;
};

const initialTodos: Todo[] = [
    { id: 0, text: 'Get apples', completed: true },
    { id: 1, text: 'Get oranges', completed: true },
    { id: 2, text: 'Get carrots', completed: false }
];

const NewTodo = ({ newId, onAdd }: NewTodoProps): React.JSX.Element => {
    const [text, setText] = useState<string>('');
    const handleAddClick = (): void => {
        setText('');
        onAdd({ id: newId, text, completed: false });
    };
    return (
        <div className="flex space-x-2">
            <TextInput value={text} onChange={e => setText(e.target.value)} />
            <Button onClick={handleAddClick}>Add</Button>
        </div>
    );
};

export const TodoList = (): React.JSX.Element => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [showActive, setShowActive] = useState<boolean>(false);

    const activeTodos: Todo[] = todos.filter(todo => !todo.completed);
    const visibleTodos: Todo[] = showActive ? activeTodos : todos;

    const listItems: React.JSX.Element[] = visibleTodos.map(todo => (
        <li key={todo.id}>
            {todo.completed ? <>&#10004; <s>{todo.text}</s></> : <>&#10008; {todo.text}</>}
        </li>
    ));

    return (
        <div className="space-y-2">
            <CheckboxField onChange={e => setShowActive(e.target.checked)}>Show only active todos</CheckboxField>
            <NewTodo newId={todos.length} onAdd={newTodo => setTodos([...todos, newTodo])} />
            <ul>{listItems}</ul>
            <footer className="text-sm italic">{activeTodos.length} todo{activeTodos.length === 1 ? '' : 's'} left</footer>
        </div>
    );
};