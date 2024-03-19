import ChapterSection from "../common/ChapterSection";
import { ContactManager } from "./effects/ContactMananger";
import { MessageForm } from "./effects/MessageForm";
import { TodoList } from "./effects/TodoList";
import { TodoListWithLog } from "./effects/TodoListWithLog";

export const NotAlwaysUseEffects = (): React.JSX.Element => {
    return (
        <ChapterSection header="You Might Not Need an Effect">
            <MessageForm />
            <ContactManager />
            <TodoListWithLog />
            <TodoList />
        </ChapterSection>
    );
}
