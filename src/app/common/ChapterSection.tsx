type ChapterSectionProps = {
    children?: React.ReactNode;
    width?: string;
    header?: string;
};

export default function ChapterSection({ children, width, header }: ChapterSectionProps): React.JSX.Element {
    return (
        <section className={`border border-black rounded-xl p-5 space-y-4 ${width ?? 'w-fit'}`}>
            {header && <h1 className="text-2xl font-bold">{header}</h1>}
            {children}
        </section>
    );
}
