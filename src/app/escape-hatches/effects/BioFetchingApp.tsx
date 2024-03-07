import { useEffect, useState } from "react";

export default function BioFetchingApp(): React.JSX.Element {
    const [person, setPerson] = useState<string>('Alice');
    const [bio, setBio] = useState<string | null>(null);

    useEffect(() => {
        setBio(null);
        let ignore: boolean = false;
        const abortController: AbortController = new AbortController();
        
        fetchBio(person).then(result => {
            if (!(ignore || abortController.signal.aborted)) {
                setBio(result);
            }
        });

        return () => {
            ignore = true;
            abortController.abort();
        };
    }, [person]);

    return (
        <div className="space-y-2">
            <select className="py-1 px-2 border border-black rounded" value={person} onChange={e => setPerson(e.target.value)}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Taylor">Taylor</option>
            </select>
            <hr className="border-black" />
            <p><i>{bio ?? 'Loading...'}</i></p>
        </div>
    );
}

async function fetchBio(person: string): Promise<string> {
    const delay: number = person === 'Bob' ? 2000 : 200;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`This is ${person}'s bio.`);
        }, delay);
    });
}
