import { useEffect, useState } from "react";
import ChapterSection from "../common/ChapterSection";
import ChatRoomApp from "./effects/DependencyChatRoomApp";

function Timer(): React.JSX.Element {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        console.log('✅ Creating an interval');
        const id: NodeJS.Timeout = setInterval(() => {
            //console.log('⏰ Interval tick');
            setCount(c => c + 1);
        }, 1000);
        return (): void => {
            console.log('❌ Clearing an interval');
            clearInterval(id);
        };
    }, []);

    return <h2 className="text-xl font-semibold">Counter: {count}</h2>;
}

export default function RemovingEffectDependencies(): React.JSX.Element {
    return (
        <ChapterSection header="Removing Effect Dependencies">
            <ChatRoomApp />
            <Timer />
        </ChapterSection>
    );
}
