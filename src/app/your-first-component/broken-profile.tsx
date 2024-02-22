"use client";

import Image from "next/image";
import { getImageUrl } from "./utils";
import { useState } from "react";
import Button from "../common/button";

type Person = {
    name: string;
    imageId: string;
};

//let currentPerson: Person;

function Panel({ children }: { children: React.ReactNode}): JSX.Element {
    const [open, setOpen] = useState<boolean>(true);
    return (
        <section className="border border-gray-800 rounded-md p-2 w-48 space-y-2">
            <Button onClick={() => setOpen(!open)}>{open ? 'Collapse' : 'Expand'}</Button>
            {open && children}
        </section>
    );
}

function Header({ person }: { person: Person }): JSX.Element {
    return (<h2 className="text-xl font-bold leading-none">{person.name}</h2>)
}

function Avatar({ person }: { person: Person }): JSX.Element {
    return (
        <Image className="rounded-full" src={getImageUrl(person.imageId)} alt={person.name} width={50} height={50} />
    )
}

export default function Profile({ person }: { person: Person }): JSX.Element {
    //currentPerson = person;
    return (
        <Panel>
            <Header person={person} />
            <Avatar person={person} />
        </Panel>
    )
}
