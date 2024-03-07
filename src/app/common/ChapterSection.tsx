type ChapterSectionProps = {
    children: React.ReactNode;
    width?: string;
};

export default function ChapterSection({ children, width }: ChapterSectionProps): React.JSX.Element {
    return (
        <section className={`border border-black rounded-xl p-5 space-y-4 ${width ?? 'w-fit'}`}>
            {children}
        </section>
    );
}
