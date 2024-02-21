"use client";

import { useEffect, useState } from "react";

type Story = {
    id: string | number;
    label: string;
};

const initialStories: Story[] = [
    { id: 0, label: 'Ankit\'s Story' },
    { id: 1, label: 'Taylor\'s Story' }
];

function StoryTray({ stories }: { stories: Story[] }): JSX.Element {
    const storiesToDisplay: Story[] = stories.slice();
    storiesToDisplay.push({
        id: 'create',
        label: 'Create Story'
    });
    return (
        <ul className="m-0">
            {storiesToDisplay.map((story: Story) => <li className="border border-gray-800 rounded-md float-left m-1 mb-5 p-1 w-16 h-24" key={story.id}>{story.label}</li>)}
        </ul>
    );
}

export default function StoryApp(): JSX.Element {
    const [stories, setStories] = useState<Story[]>(initialStories);
    const time: Date = useTime();

    if (stories.length > 100) setStories(stories.slice(0, 100));

    return (
        <div className="text-center w-full h-full space-y-2">
            <h2 className="text-2xl font-bold">It is {time.toLocaleTimeString()} now.</h2>
            <StoryTray stories={stories} />
        </div>
    );
}

function useTime(): Date {
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(id);
    });
    return time;
}
