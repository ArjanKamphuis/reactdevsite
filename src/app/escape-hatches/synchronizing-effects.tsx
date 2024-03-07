import ChapterSection from "../common/ChapterSection";
import BioFetchingApp from "./effects/BioFetchingApp";
import ChatRoomApp from "./effects/ChatRoomApp";
import CounterApp from "./effects/CounterApp";
import MyInputForm from "./effects/MyInputApp";
import PlaygroundApp from "./effects/PlaygroundApp";
import VideoPlayerApp from "./effects/VideoPlayerApp";



export default function SynchronizingEffects(): React.JSX.Element {
    return (
        <ChapterSection width="w-[32rem]">
            <h1 className="text-2xl font-bold">Synchronizing with Effects</h1>
            <BioFetchingApp />
            <CounterApp />
            <MyInputForm />
            <PlaygroundApp />
            <ChatRoomApp />
            <VideoPlayerApp />
        </ChapterSection>
    );
}
