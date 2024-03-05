import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksProvider } from "./TasksContext";

export default function TaskApp(): React.JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-[32rem]">
            <h1 className="text-2xl font-bold">Day off in Kyoto</h1>
            <TasksProvider>
                <AddTask />
                <TaskList />
            </TasksProvider>
        </section>
    );
}
