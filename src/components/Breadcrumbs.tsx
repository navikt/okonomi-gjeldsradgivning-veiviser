import Link from 'next/link';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import MediaQuery from 'react-responsive';

export const Breadcrumbs = (props: { title: string }) => {
    return (
        <nav className="breadcrumbs">
            <MediaQuery minWidth={310}>
                <Link href="/">
                    <a className="breadcrumbs__previous lenke">Økonomi- og gjeldsrådgivning</a>
                </Link>
                <NavFrontendChevron type="høyre" />
                <div className="breadcrumbs__current">
                    <Normaltekst>{props.title}</Normaltekst>
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={309}>
                <Link href="/">
                    <a className="lenke">Til forsiden</a>
                </Link>
            </MediaQuery>
        </nav>
    );
};
