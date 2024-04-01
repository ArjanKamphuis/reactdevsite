import { Dispatch, SetStateAction, useState } from "react";
import useInterval from "./useInterval";

export default function useCounter(initialCount: number = 0, initialDelay: number = 1000): [number, number, Dispatch<SetStateAction<number>>] {
    const [count, setCount] = useState<number>(initialCount);
    const [delay, setDelay] = useState<number>(initialDelay);
    useInterval<[number]>(() => setCount(c => c + 1), delay);
    return [count, delay, setDelay];
}
