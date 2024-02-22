import { useState } from "react";
import Button from "../common/button";

type Queue = Array<number | ((n: number) => number)>;

type TestCaseProps = {
    baseState: number;
    queue: Queue;
    expected: number;
};

function RequestTracker(): JSX.Element {
    const [pending, setPending] = useState<number>(0);
    const [completed, setCompleted] = useState<number>(0);

    async function handleClick(): Promise<void> {
        setPending((p: number) => p + 1);
        await delay(3000);
        setPending((p: number) => p - 1);
        setCompleted((c: number) => c + 1);
    }

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Pending: {pending}</h3>
            <h3 className="text-lg font-medium">Completed: {completed}</h3>
            <Button onClick={handleClick}>Buy</Button>
        </div>
    );
}

function TestCase({ baseState, queue, expected }: TestCaseProps): JSX.Element {
    const actual: number = getFinalState(baseState, queue);
    return (
        <div>
            <p>Base state: <b>{baseState}</b></p>
            <p>Queue: <b>[{queue.join(', ')}]</b></p>
            <p>Expected result: <b>{expected}</b></p>
            <p className={actual === expected ? 'text-green-500' : 'text-red-500'}>Your result: <b>{actual}</b> ({actual === expected ? 'correct' : 'wrong'})</p>
        </div>
    );
}

export default function StateUpdates(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-fit">
            <h1 className="text-2xl font-bold">State Updates</h1>
            <RequestTracker />
            <div className="border border-black rounded-xl p-2 space-y-2">
                <TestCase baseState={0} queue={[1, 1, 1]} expected={1} />
                <TestCase baseState={0} queue={[increment, increment, increment]} expected={3} />
                <TestCase baseState={0} queue={[5, increment]} expected={6} />
                <TestCase baseState={0} queue={[5, increment, 42]} expected={42} />
            </div>
        </section>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve: (value: void | Promise<void>) => void) => { setTimeout(resolve, ms)});
}

function increment(n: number): number {
    return n + 1;
}
increment.toString = () => 'n => n+1';

function getFinalState(baseState: number, queue: Queue): number {
    let finalState: number = baseState;

    for (const q of queue) {
        if (typeof q === 'function') {
            finalState = q(finalState);
        } else {
            finalState = q;
        }
    }

    return finalState;
}
