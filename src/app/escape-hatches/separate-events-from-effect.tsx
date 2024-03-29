import ChapterSection from "../common/ChapterSection";
import ChatRoomApp from "./effects/ChatRoomWithUseEffectEvent";
import IncrementalTimer from "./effects/IncrementalTimer";

export default function SeparateEventsFromEffects(): React.JSX.Element {
    return (
        <ChapterSection header="Separating Events from Effects">
            <ChatRoomApp />
            <IncrementalTimer />
        </ChapterSection>
    )
}