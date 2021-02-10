import { Innholdstittel } from 'nav-frontend-typografi';
import Head from 'next/head';
import Link from 'next/link';

import { FrontpagePanel } from '../components/FrontpagePanel';
import { Layout } from '../components/Layout';

const Custom404 = () => (
    <>
        <Head>
            <title>Økonomi- og gjeldsrådgivning</title>
        </Head>
        <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={true}>
            <FrontpagePanel>
                <Innholdstittel>Denne siden finnes ikke</Innholdstittel>
                <p>
                    Prøv å gå tilbake til{' '}
                    <Link href="/">
                        <a className="lenke">forsiden</a>
                    </Link>
                    .
                </p>
            </FrontpagePanel>
        </Layout>
    </>
);

export default Custom404;
