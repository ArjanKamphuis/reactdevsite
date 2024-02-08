import { getImageUrl } from "./utils";

type ImageProps = {
    imageId: string;
    imageSize: number;
}

export interface ProfileProps {
    name: string;
    image: ImageProps;
    profession: string;
    awards: Array<string>;
    discovered: string;
}

export default function Profile({ profile } : { profile: ProfileProps }): JSX.Element {
    const { name, image, profession, awards, discovered } = profile;
    return (
        <section className="border border-black rounded p-4 space-y-2">
            <h2 className="text-xl font-semibold">{name}</h2>
            <img className="rounded-full" src={getImageUrl(image.imageId)} alt={name} width={image.imageSize} height={image.imageSize} />
            <ul className="list-disc list-inside leading-none">
                <li><b>Profession: </b>{profession}</li>
                <li><b>Awards: {awards.length} </b>({awards.join(', ')})</li>
                <li><b>Discovered: </b>{discovered}</li>
            </ul>
        </section>
    );
}
