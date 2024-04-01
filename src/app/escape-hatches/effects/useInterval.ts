import { useEffect } from "react";
import { useEffectEvent } from "./useEffectEvent";

export default function useInterval<TArgs extends unknown[]>(callback: (...args: TArgs) => void, delay: number): void {
    const onTick = useEffectEvent(callback);
    useEffect(() => {
        console.log(`✅ Setting up an interval with delay ${delay}`);
        const id: number = setInterval(onTick, delay);
        return (): void => {
            console.log(`❌ Clearing an interval with delay ${delay}`);
            clearInterval(id);
        };
    }, [delay, onTick]);
}
