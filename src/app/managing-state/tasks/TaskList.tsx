import { Dispatch, useContext, useState } from "react";
import { Action, TaskDispatchContext, Task, TasksContext } from "./TasksContext";
import Button from "@/app/common/button";
import TextInput from "@/app/common/textInput";

function TaskRenderer({ task }: { task: Task }): React.JSX.Element {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch: Dispatch<Action> = useContext(TaskDispatchContext);
    const taskContent: React.JSX.Element =
        isEditing 
        ? <TextInput value={task.text} onChange={e => dispatch({ type: 'changed', task: { ...task, text: e.target.value } })} />
        : <span>{task.text}</span>;
    const editSaveButton: React.JSX.Element =
        isEditing
        ? <Button onClick={() => setIsEditing(false)}>Save</Button>
        : <Button onClick={() => setIsEditing(true)}>Edit</Button>;
    return (
        <div className="flex justify-between h-[34px] items-center">
            <div className="flex space-x-1">
                <input type="checkbox" checked={task.done} onChange={e => dispatch({ type: 'changed', task: { ...task, done: e.target.checked } })} />
                {taskContent}
            </div>
            <div className="space-x-2">
                {editSaveButton}
                <Button onClick={() => dispatch({ type: 'deleted', id: task.id })}>Delete</Button>
            </div>
        </div>
    );
}

export default function TaskList(): React.JSX.Element {
    const tasks: Task[] = useContext(TasksContext);
    const itemList: JSX.Element[] = tasks.map(task =>
        <li key={task.id}>
            <TaskRenderer task={task} />
        </li>
    );
    return <ul className="space-y-2">{itemList}</ul>;
}
