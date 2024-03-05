import { Context, Dispatch, createContext, useReducer } from "react";

export type Task = {
    id: number;
    text: string;
    done: boolean;
};

export type Action = AddAction | ChangeAction | DeleteAction;

type AddAction = {
    type: 'added';
    id: number;
    text: string;
};
type ChangeAction = {
    type: 'changed';
    task: Task;
};
type DeleteAction = {
    type: 'deleted';
    id: number;
};

export const TasksContext: Context<Task[]> = createContext(Array().fill({} as Task));
export const TaskDispatchContext: Context<Dispatch<Action>> = createContext({} as Dispatch<Action>);

export function TasksProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [tasks, dispatch] = useReducer(tasksReducer, initalTasks);
    return (
        <TasksContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

function tasksReducer(tasks: Task[], action: Action): Task[] {
    switch (action.type) {
        case 'added': {
            return [...tasks, { id: action.id, text: action.text, done: false }];
        }
        case 'changed': {
            return tasks.map(t => t.id === action.task.id ? action.task : t);
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
    }
}

const initalTasks: Task[] = [
    { id: 0, text: 'Philosopher\'s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];
