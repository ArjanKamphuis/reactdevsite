import { ChangeEvent, FormEvent, useState } from "react";
import { Sculpture, sculptureList } from "./sculpture-list";
import Button from "../common/button";
import Image from "next/image";
import TextInput from "../common/textInput";

function Gallery(): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [showMore, setShowMore] = useState<boolean>(false);

    if (sculptureList.length === 0) {
        return <h2 className="text-xl font-semibold">Something went wrong with sculptures!</h2>;
    }

    const sculpture: Sculpture = sculptureList[index];
    const hasNext: boolean = index < sculptureList.length - 1;
    const hasPrevious: boolean = index > 0;

    const handleNextClick: () => void = () => { if (hasNext) setIndex((i: number) => i + 1) };
    const handlePreviousClick: () => void = () => { if (hasPrevious) setIndex((i: number) => i - 1) };
    const handleMoreClick: () => void = () => setShowMore(!showMore);

    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <Button disabled={!hasPrevious} onClick={handlePreviousClick}>Previous</Button>
                <Button disabled={!hasNext} onClick={handleNextClick}>Next</Button>
            </div>
            <h2 className="text-xl font-semibold"><i>{sculpture.name}</i> by {sculpture.artist}</h2>
            <h3 className="text-lg font-medium">({index + 1} of {sculptureList.length})</h3>
            <Button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</Button>
            {showMore && <p>{sculpture.description}</p>}
            <Image src={sculpture.url} alt={sculpture.alt} width={120} height={120} />
        </div>
    );
}

function Form(): JSX.Element {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const handleLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
    const handleReset: () => void = () => { setFirstName(''); setLastName(''); };

    return (
        <form className="space-y-2" onSubmit={(e: FormEvent) => e.preventDefault()}>
            <div className="grid gap-2 grid-cols-2">
                <TextInput placeholder="First name..." value={firstName} onChange={handleFirstNameChange} />
                <TextInput placeholder="Last name..." value={lastName} onChange={handleLastNameChange} />
            </div>
            <h2 className="text-xl font-semibold">Hi, {firstName} {lastName}</h2>
            <Button type="reset" onClick={handleReset}>Reset</Button>
        </form>
    );
}

function FeedbackForm(): JSX.Element {
    const [isSent, setIsSent] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    if (isSent) return <h1 className="text-2xl font-bold">Thank you!</h1>;

    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
    }

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <textarea className="block border border-black rounded px-2 py-1 w-full" placeholder="Message" value={message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} />
            <Button type="submit">Send</Button>
        </form>
    );
}

function Greeting(): JSX.Element {
    function handleClick(): void {
        const name: string | null = prompt('What is your name?');
        alert(`Hello, ${name}`);
    }

    return <Button onClick={handleClick}>Greet</Button>;
}

export default function State(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-[30rem]">
            <h1 className="text-2xl font-bold">State: A Component&apos;s Memory</h1>
            <Gallery />
            <Form />
            <FeedbackForm />
            <Greeting />
        </section>
    );
}
