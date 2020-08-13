import Link from 'next/link';

export const Breadcrumbs = (props: { title: string }) => {
    return (
        <div className="breadcrumbs">
            <Link href="/">Økonomi- og gjeldsrådgivning</Link> / {props.title}
        </div>
    );
};
