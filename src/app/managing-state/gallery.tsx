import { useState } from "react";
import Button from "../common/button";
import Image from "next/image";

type ImageType = {
    place: string;
    src: string;
};

export default function Gallery(): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const hasNext: boolean = index < images.length - 1;
    const image: ImageType = images[index];
    const handleClick: () => void = () => setIndex(hasNext ? index + 1 : 0);
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Clear an image while it&apos;s loading</h2>
            <Button onClick={handleClick}>Next</Button>
            <h3 className="text-lg font-medium">Image {index +1} of {images.length}</h3>
            <Image className="w-36 h-36" key={image.src} src={image.src} alt={image.place} width={0} height={0} sizes="100vw" priority />
            <p>{image.place}</p>
        </div>
    );
}

const images: ImageType[] = [{
    place: 'Penang, Malaysia',
    src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
    place: 'Lisbon, Portugal',
    src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
    place: 'Bilbao, Spain',
    src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
    place: 'Valparaíso, Chile',
    src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
    place: 'Schwyz, Switzerland',
    src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
    place: 'Prague, Czechia',
    src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
    place: 'Ljubljana, Slovenia',
    src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
