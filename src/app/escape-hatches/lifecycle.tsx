import ChapterSection from "../common/ChapterSection";
import { LifeCycleChatRoomApp } from "./effects/LifecyleChatRoomApp";
import { PinkDotSyncApp } from "./effects/PinkDotSyncApp";
import PlacesApp from "./effects/PlacesApp";

export const LifeCycle = (): React.JSX.Element => {
    return (
        <ChapterSection header="Lifecycle of Reactive Effects">
            <PlacesApp />
            <PinkDotSyncApp />
            <LifeCycleChatRoomApp />
        </ChapterSection>
    );
};
