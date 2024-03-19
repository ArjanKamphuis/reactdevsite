import CheckboxField from "@/app/common/CheckboxField";
import Button from "@/app/common/button";
import TextInput from "@/app/common/textInput";
import { useMemo, useState } from "react";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const initialTodos: Todo[] = [
    { id: 0, text: 'Get apples', completed: true },
    { id: 1, text: 'Get oranges', completed: true },
    { id: 2, text: 'Get carrots', completed: false }
];

let calls = 0;
const getVisibleTodos = (todos: Todo[], showActive: boolean): Todo[] => {
    console.log(`getVisibleTodos() was called ${++calls} time${calls === 1 ? '' : 's'}`);
    const activeTodos: Todo[] = todos.filter(todo => !todo.completed);
    return showActive ? activeTodos : todos;
};

export const TodoListWithLog = (): React.JSX.Element => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [showActive, setShowActive] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const visibleTodos: Todo[] = useMemo(() => getVisibleTodos(todos, showActive), [todos, showActive]);

    const listItems: React.JSX.Element[] = visibleTodos.map(todo => (
        <li key={todo.id}>
            {todo.completed ? <>&#10004; <s>{todo.text}</s></> : <>&#10008; {todo.text}</>}
        </li>
    ));

    const handleAddClick = (): void => {
        setText('');
        setTodos([...todos, { id: todos.length, text, completed: false }]);
    };

    return (
        <div className="space-y-2">
            <CheckboxField onChange={e => setShowActive(e.target.checked)}>Show only active todos</CheckboxField>
            <div className="flex space-x-2">
                <TextInput value={text} onChange={e => setText(e.target.value)} />
                <Button onClick={handleAddClick}>Add</Button>
            </div>
            <ul>{listItems}</ul>
        </div>
    );
};