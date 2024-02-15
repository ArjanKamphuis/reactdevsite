import Image from "next/image";
import React from "react";

type CardProps = {
    title: string;
    children: React.ReactNode;
};

function Card({ title, children }: CardProps): JSX.Element {
    return (
        <div className="w-fit p-5 rounded-xl border border-gray-500">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                {children}
            </div>
        </div>
    )
}

export default function Profile(): JSX.Element {
    return (
        <section className="space-y-5 p-5 border rounded-xl border-black">
            <h1 className="text-4xl font-bold">Children props</h1>
            <Card title="Photo">
                <Image className="rounded-full" src="https://i.imgur.com/OKS67lhm.jpg" alt="Aklilu Lemma" width={70} height={70} />
            </Card>
            <Card title="About">
                <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
            </Card>
        </section>
    );
}
