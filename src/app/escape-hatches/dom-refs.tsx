import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import ChapterSection from "../common/ChapterSection";
import Button from "../common/button";
import Image from "next/image";
import { flushSync } from "react-dom";
import { TextInputWithRef } from "../common/textInput";

function VideoPlayer(): React.JSX.Element {
    const [isPlaying, setIsPlaying]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const videRef: MutableRefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement>(null);

    function handleClick(): void {
        if (isPlaying) handlePause();
        else handlePlay();
    }

    function handlePlay(): void {
        setIsPlaying(true);
        if (videRef.current) videRef.current.play();
    }

    function handlePause(): void {
        setIsPlaying(false);
        if (videRef.current) videRef.current.pause();
    }

    return (
        <div className="space-y-2">
            <Button onClick={handleClick}>{isPlaying ? 'Pause' : 'Play'}</Button>
            <video ref={videRef} className="w-64" onPlay={handlePlay} onPause={handlePause}>
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            </video>
        </div>
    );
}

function Page(): React.JSX.Element {
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
    return (
        <div className="flex space-x-2">
            <Button onClick={() => inputRef.current?.focus()}>Search</Button>
            <input ref={inputRef} className="px-2 py-1 border border-black rounded w-full" placeholder="Looking for something..?" />
        </div>
    );
}

function CatFriends(): React.JSX.Element {
    const [index, setIndex]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const liRef: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement>(null);
    const listItems: React.JSX.Element[] = catList.map((cat, i) => {
        const liClassName: string = `shrink-0 ${index === i ? 'bg-[#006496]/[0.4]' : ''}`;
        return (
            <li key={cat.id} className={liClassName} ref={index === i ? liRef : null}>
                <Image className="w-64 p-2" src={cat.imageUrl} alt={`Cat #${cat.id}`} width={0} height={0} sizes="100vw" priority />
            </li>
        );
    });

    function handleClick(): void {
        flushSync(() => setIndex((index + 1) % catList.length));
        liRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <Button onClick={handleClick}>Next</Button>
                <p>Image {index + 1} of {catList.length}</p>
            </div>
            <ul className="flex space-x-2 overflow-hidden">{listItems}</ul>
        </div>
    );
}

function SeparateComponents(): React.JSX.Element {
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
    return (
        <div className="flex space-x-2">
            <Button onClick={() => inputRef.current?.focus()}>Search</Button>
            <TextInputWithRef ref={inputRef} placeholder="Looking for something..?" />
        </div>
    )
}

export default function DomRefs(): React.JSX.Element {
    return (
        <ChapterSection width="w-[32rem]">
            <h1 className="text-2xl font-bold">Manipulating the DOM with Refs</h1>
            <SeparateComponents />
            <CatFriends />
            <Page />
            <VideoPlayer />
        </ChapterSection>
    );
}

type Cat = {
    id: number;
    imageUrl: string;
};
const catList: Cat[] = [];
for (let i = 0; i < 10; i++) {
    catList.push({ id: i, imageUrl: `https://placekitten.com/250/200?image=${i}`});
}