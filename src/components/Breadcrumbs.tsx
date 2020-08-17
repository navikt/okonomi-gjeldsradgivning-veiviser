import Link from 'next/link';

export const Breadcrumbs = (props: { title: string }) => {
    return (
        <nav className="breadcrumbs">
            <Link href="/">
                <a>Økonomi- og gjeldsrådgivning</a>
            </Link>{' '}
            / {props.title}
        </nav>
    );
};
