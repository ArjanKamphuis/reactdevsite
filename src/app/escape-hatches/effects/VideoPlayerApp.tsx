import Button from "@/app/common/button";
import TextInput from "@/app/common/textInput";
import { MutableRefObject, useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
    src: string;
    isPlaying: boolean;  
};

function VideoPlayer({ src, isPlaying }: VideoPlayerProps): React.JSX.Element {
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isPlaying) {
            console.log('Calling video.play()');
            videoRef.current?.play();
        } else {
            console.log('Calling video.pause()');
            videoRef.current?.pause();
        }
    }, [isPlaying]);

    return <video ref={videoRef} src={src} className="w-64" loop playsInline />
}

export default function VideoPlayerApp(): React.JSX.Element {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    return (
        <div className="space-y-2">
            <TextInput value={text} onChange={e => setText(e.target.value)} placeholder="..." />
            <Button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</Button>
            <VideoPlayer isPlaying={isPlaying} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
        </div>
    );
}
