import Image from "next/image";
import { Context, createContext, useContext, useState } from "react";
import { getImageUrl } from "../common/utils";
import CheckboxField from "../common/CheckboxField";

const ImageSizeContext: Context<number> = createContext<number>(0);

type PlaceType = {
    id: number;
    name: string;
    description: string;
    imageId: string;
};

function List(): JSX.Element {
    const listItems: JSX.Element[] = places.map(place =>
        <li key={place.id}>
            <Place place={place} />
        </li>
    );
    return <ul className="space-y-2">{listItems}</ul>
}

function Place({ place }: { place: PlaceType}): JSX.Element {
    return (
        <div className="flex space-x-2">
            <PlaceImage place={place} />
            <p><b>{place.name}</b>: {place.description}</p>
        </div>
    );
}

function PlaceImage({ place }: { place: PlaceType}): JSX.Element {
    const className: string = useContext<number>(ImageSizeContext) === 150 ? 'w-36 h-36' : 'w-24 h-24';
    return <Image className={className} src={getImageUrl(place.imageId, 'l')} alt={place.name} width={0} height={0} sizes="100vw" />;
}

export default function ContextApp(): JSX.Element {
    const [isLarge, setIsLarge] = useState<boolean>(false);
    const imageSize: number = isLarge ? 150 : 100;
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-[32rem]">
            <h1 className="text-2xl font-bold">Passing Data Deeply with Context</h1>
            <CheckboxField checked={isLarge} onChange={e => setIsLarge(e.target.checked)}>Use large images</CheckboxField>
            <hr className="border-black" />
            <ImageSizeContext.Provider value={imageSize}>
                <List />
            </ImageSizeContext.Provider>
        </section>
    );
}

const places: PlaceType[] = [{
    id: 0,
    name: 'Bo-Kaap in Cape Town, South Africa',
    description: 'The tradition of choosing bright colors for houses began in the late 20th century.',
    imageId: 'K9HVAGH'
}, {
    id: 1, 
    name: 'Rainbow Village in Taichung, Taiwan',
    description: 'To save the houses from demolition, Huang Yung-Fu, a local resident, painted all 1,200 of them in 1924.',
    imageId: '9EAYZrt'
}, {
    id: 2, 
    name: 'Macromural de Pachuca, Mexico',
    description: 'One of the largest murals in the world covering homes in a hillside neighborhood.',
    imageId: 'DgXHVwu'
}, {
    id: 3, 
    name: 'Selarón Staircase in Rio de Janeiro, Brazil',
    description: 'This landmark was created by Jorge Selarón, a Chilean-born artist, as a "tribute to the Brazilian people."',
    imageId: 'aeO3rpI'
}, {
    id: 4, 
    name: 'Burano, Italy',
    description: 'The houses are painted following a specific color system dating back to 16th century.',
    imageId: 'kxsph5C'
}, {
    id: 5, 
    name: 'Chefchaouen, Marocco',
    description: 'There are a few theories on why the houses are painted blue, including that the color repels mosquitos or that it symbolizes sky and heaven.',
    imageId: 'rTqKo46'
}, {
    id: 6,
    name: 'Gamcheon Culture Village in Busan, South Korea',
    description: 'In 2009, the village was converted into a cultural hub by painting the houses and featuring exhibitions and art installations.',
    imageId: 'ZfQOOzf'
}];
