export default function Clock({ time }: { time: Date }): JSX.Element {
    const hours: number = time.getHours();
    const className = `${hours >= 0 && hours <= 6 ? 'text-[#fff] bg-[#222]' : 'text-[#222] bg-[#fff]'} text-2xl font-bold py-1 px-2 rounded-xl`;
    //document.getElementById('time')!.className = hours >= 0 && hours <= 6 ? 'night' : 'day';
    return (
        <h2 className={className} id="time">{time.toLocaleString()}</h2>
    );
}
