import Link from 'next/link';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import MediaQuery from 'react-responsive';

export const Breadcrumbs = (props: { title: string }) => {
    return (
        <nav className="breadcrumbs">
            <div className="breadcrumbs__desktop">
                <Link href="/">
                    <a className="breadcrumbs__previous lenke">Økonomi- og gjeldsrådgivning</a>
                </Link>
                <NavFrontendChevron type="høyre" />
                <div className="breadcrumbs__current">
                    <Normaltekst>{props.title}</Normaltekst>
                </div>
            </div>
            <div className="breadcrumbs__mobile">
                <NavFrontendChevron type="venstre" />
                <Link href="/">
                    <a className="lenke">Tilbake</a>
                </Link>
            </div>
        </nav>
    );
};
