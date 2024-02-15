import Image from "next/image";
import { getImageUrl } from "./utils";

type ProfileProps = {
    person: Person;
    imageSize?: number;
}

export type Person = {
    name: string;
    imageId: string;
    profession: string;
    awards: Array<string>;
    discovered: string;
}

export default function Profile({ person, imageSize = 70 } : ProfileProps): JSX.Element {
    const { name, imageId, profession, awards, discovered } = person;
    return (
        <section className="border border-gray-500 rounded p-4 space-y-2">
            <h2 className="text-xl font-semibold">{name}</h2>
            <Image className="rounded-full" src={getImageUrl(imageId)} alt={name} width={imageSize} height={imageSize} />
            <ul className="list-disc list-inside leading-none">
                <li><b>Profession: </b>{profession}</li>
                <li><b>Awards: {awards.length} </b>({awards.join(', ')})</li>
                <li><b>Discovered: </b>{discovered}</li>
            </ul>
        </section>
    );
}
