import { Fragment } from "react";

type PoemType = {
    lines: string[];
};

export default function Poem(): JSX.Element {
    return (
        <article className="space-y-2 p-5 border border-black rounded-xl text-center">
            <h1 className="text-2xl font-bold">Poem</h1>
            {poem.lines.map((line: string, index: number) =>
                <Fragment key={index}>
                    { index > 0 && <hr className="border border-dashed border-sky-500 mx-28" />}
                    <p className="italic text-xl font-light">{line}</p>
                </Fragment>
            )}
        </article>
    );
}

const poem: PoemType = {
    lines: [
        'I write, erase, rewrite',
        'Erase again, and then',
        'A poppy blooms.'
    ]
};
