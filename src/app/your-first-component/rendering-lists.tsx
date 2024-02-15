import Image from "next/image";
import { getImageUrl } from "./utils";

type PersonType = {
    id: number;
    name: string;
    profession: string;
    accomplishment: string;
    imageId: string;
}

function RenderPerson(person: PersonType): JSX.Element {
    return (
        <li className="grid grid-cols-2 gap-x-5 items-center" key={person.id}>
            <Image className="rounded-full" src={getImageUrl(person.imageId)} alt={person.name} width={100} height={100} />
            <p className="leading-tight">
                <b>{person.name}</b>
                {` ${person.profession} `}
                known for {person.accomplishment}
            </p>
        </li>
    );
}

function RenderList({ title, people }: { title: string, people: PersonType[] }): JSX.Element {
    const listItems: JSX.Element[] = people.map((person: PersonType) => RenderPerson(person));
    return (
        <article className="space-y-2 p-2 w-96">
            <h1 className="text-2xl font-bold">{title}</h1>
            <ul className="space-y-2.5">{listItems}</ul>
        </article>
    );
}

export default function List(): JSX.Element {
    // const chemists: PersonType[] = PEOPLE.filter((person: PersonType) => person.profession === 'chemist');
    // const others: PersonType[] = PEOPLE.filter((person: PersonType) => person.profession !== 'chemist');
    
    const chemists: PersonType[] = [];
    const others: PersonType[] = [];
    PEOPLE.forEach((person: PersonType) => {
        if (person.profession === 'chemist') chemists.push(person);
        else others.push(person);
    });

    return (
        <section className="flex space-y-2 p-5 border border-black rounded-xl w-fit">
            <RenderList title="Chemists" people={chemists} />
            <RenderList title="Everyone Else" people={others} />
        </section>
    );
}

const PEOPLE: PersonType[] = [
    {
        id: 0,
        name: 'Creola Katherine Johnson',
        profession: 'mathematician',
        accomplishment: 'spaceflight calculations',
        imageId: 'MK3eW3A'
    }, {
        id: 1,
        name: 'Mario José Molina-Pasquel Henríquez',
        profession: 'chemist',
        accomplishment: 'discovery of Arctic ozone hole',
        imageId: 'mynHUSa'
    }, {
        id: 2,
        name: 'Mohammad Abdus Salam',
        profession: 'physicist',
        accomplishment: 'electromagnetism theory',
        imageId: 'bE7W1ji'
    }, {
        id: 3,
        name: 'Percy Lavon Julian',
        profession: 'chemist',
        accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
        imageId: 'IOjWm71'
    }, {
        id: 4,
        name: 'Subrahmanyan Chandrasekhar',
        profession: 'astrophysicist',
        accomplishment: 'white dwarf star mass calculations',
        imageId: 'lrWQx8l'
    }
];
