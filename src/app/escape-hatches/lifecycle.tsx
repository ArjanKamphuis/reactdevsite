import ChapterSection from "../common/ChapterSection";
import { LifeCycleChatRoomApp } from "./effects/LifecyleChatRoomApp";

export const LifeCycle = (): React.JSX.Element => {
    return (
        <ChapterSection header="Lifecycle of Reactive Effects">
            <LifeCycleChatRoomApp />
        </ChapterSection>
    );
};
