import { useState } from "react";
import TextInput from "../common/textInput";
import Button from "../common/button";
import { useImmer } from "use-immer";

type Todo = {
    id: number;
    title: string;
    done: boolean;
};

type AddTodoHandler    = (title: string)  => void;
type ChangeTodoHandler = (nextTodo: Todo) => void;
type DeleteTodoHandler = (todoId: number) => void;

type TaskListProps = {
    todos: Todo[];
    onChangeTodo: ChangeTodoHandler;
    onDeleteTodo: DeleteTodoHandler;
};

type TaskProps = {
    todo: Todo;
    onChange: ChangeTodoHandler;
    onDelete: DeleteTodoHandler;
};

const initialTodos: Todo[] = [
    { id: 0, title: 'Buy milk', done: true },
    { id: 1, title: 'Eat tacos', done: false },
    { id: 2, title: 'Brew tea', done: false }
];

function AddTodo({ onAddTodo }: { onAddTodo: AddTodoHandler }): JSX.Element {
    const [title, setTitle] = useState<string>('');
    return (
        <div className="flex space-x-1">
            <TextInput placeholder="Add todo" value={title} onChange={e => setTitle(e.target.value)} />
            <Button onClick={() => { setTitle(''); onAddTodo(title); }}>Add</Button>
        </div>
    );
}

function TaskList({ todos, onChangeTodo, onDeleteTodo }: TaskListProps): JSX.Element {
    return (
        <ul className="space-y-2">
            {todos.map(todo => (
                <li key={todo.id}>
                    <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
                </li>
            ))}
        </ul>
    );
}

function Task({ todo, onChange, onDelete }: TaskProps): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    let todoContent: JSX.Element;
    if (isEditing) {
        todoContent = (
            <>
                <TextInput value={todo.title} onChange={e => { onChange({ ...todo, title: e.target.value }); }} />
                <Button onClick={() => setIsEditing(false)}>Save</Button>
            </>
        );
    } else {
        todoContent = <>{todo.title}<Button onClick={() => setIsEditing(true)}>Edit</Button></>;
    }
    return (
        <label className="flex items-center space-x-1">
            <input className="mr-1" type="checkbox" checked={todo.done} onChange={e => { onChange({ ...todo, done: e.target.checked }); }} />
            {todoContent}
            <Button onClick={() => onDelete(todo.id)}>Delete</Button>
        </label>
    );
}

export function TaskApp(): JSX.Element {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    const handleAddTodo:    AddTodoHandler    = title    => setTodos([...todos, { id: todos.length, title: title, done: false}]);
    const handleChangeTodo: ChangeTodoHandler = nextTodo => setTodos(todos.map(todo => todo.id === nextTodo.id ? nextTodo : todo));
    const handleDeleteTodo: DeleteTodoHandler = todoId   => setTodos(todos.filter(todo => todo.id !== todoId));

    return renderTaskApp(todos, handleAddTodo, handleChangeTodo, handleDeleteTodo);
}

export function TaskAppImmer(): JSX.Element {
    const [todos, updateTodos] = useImmer<Todo[]>(initialTodos);

    function handleAddTodo(title: string): void {
        updateTodos(draft => { draft.push({ id: todos.length, title: title, done: false }); });
    }

    function handleChangeTodo(nextTodo: Todo): void {
        updateTodos(draft => {
            const todo: Todo | undefined = draft.find(d => d.id === nextTodo.id);
            if (!todo) return draft;
            todo.title = nextTodo.title;
            todo.done = nextTodo.done;
        });
    }

    function handleDeleteTodo(todoId: number): void {
        updateTodos(draft => {
            const index: number = todos.findIndex((todo) => todo.id === todoId);
            draft.splice(index, 1);
        });
    }

    return renderTaskApp(todos, handleAddTodo, handleChangeTodo, handleDeleteTodo);
}

function renderTaskApp(todos: Todo[], handleAddTodo: AddTodoHandler, handleChangeTodo: ChangeTodoHandler, handleDeleteTodo: DeleteTodoHandler): JSX.Element {
    return (
        <div className="space-y-2">
            <AddTodo onAddTodo={handleAddTodo} />
            <TaskList todos={todos} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />
        </div>
    );
}
