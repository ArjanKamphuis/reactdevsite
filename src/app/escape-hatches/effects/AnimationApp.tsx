import Button from "@/app/common/button";
import { useEffect, useRef, useState } from "react";
import { useEffectEvent } from "./useEffectEvent";
//import { experimental_useEffectEvent as useEffectEvent } from "react";

class FadeInAnimation {
    private node: HTMLElement;
    private duration: number = 0;
    private startTime: number = 0;
    private frameId: number = 0;

    constructor(node: HTMLElement) {
        this.node = node;
    }

    start = (duration: number): void => {
        this.duration = duration;
        if (this.duration === 0) {
            // Jump to end immediately
            this.onProgress(1);
        } else {
            this.onProgress(0);
            // Start animating
            this.startTime = performance.now();
            this.frameId = requestAnimationFrame(() => this.onFrame());
        }
    }

    onFrame = (): void => {
        const timePassed = performance.now() - this.startTime;
        const progress = Math.min(timePassed / this.duration, 1);
        this.onProgress(progress);
        if (progress < 1) {
            // We still have more frames to paint
            this.frameId = requestAnimationFrame(() => this.onFrame());
        }
    }

    onProgress = (progress: number): void => {
        this.node.style.opacity = progress.toString();
    };

    stop = (): void => {
        cancelAnimationFrame(this.frameId);
        this.startTime = 0;
        this.frameId = 0;
        this.duration = 0;
    };
}

function Welcome({ duration }: { duration: number}): React.JSX.Element {
    const ref = useRef<HTMLHeadingElement | null>(null);
    const onAppear = useEffectEvent<(animation: FadeInAnimation) => void>(animation => animation.start(duration));

    useEffect(() => {
        if (ref.current === null) return;
        const animation = new FadeInAnimation(ref.current);
        onAppear(animation);
        return (): void => { animation.stop(); };
    }, [onAppear]);

    return (
        <h2 ref={ref} className="opacity-0 text-white p-12 text-center text-5xl"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' }}
        >Welcome</h2>
    );
}

export default function AnimationApp(): React.JSX.Element {
    const [duration, setDuration] = useState<number>(1000);
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="space-y-2">
            <label className="block">
                <input className="block" type="range" min={100} max={3000} value={duration} onChange={e => setDuration(Number(e.target.value))} />
                <span>Fade in duration: {duration} ms</span>
            </label>
            <Button onClick={() => setShow(s => !s)}>{show ? 'Remove' : 'Show'}</Button>
            <hr className="border-black" />
            {show && <Welcome duration={duration} />}
        </div>
    );
}
