import { Dispatch, useContext, useState } from "react";
import { Action, TaskDispatchContext, Task, TasksContext } from "./TasksContext";
import Button from "@/app/common/button";
import TextInput from "@/app/common/textInput";

export default function AddTask(): React.JSX.Element {
    const [text, setText] = useState('');
    const tasks: Task[] = useContext(TasksContext);
    const dispatch: Dispatch<Action> = useContext(TaskDispatchContext);
    return (
        <div className="flex space-x-2">
            <TextInput value={text} placeholder="Add task..." onChange={e => setText(e.target.value)} />
            <Button onClick={() => { setText(''); dispatch({ type: 'added', id: tasks.length, text: text }); }}>Add</Button>
        </div>
    );
}
