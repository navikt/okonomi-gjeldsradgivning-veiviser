import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout';
import { getPageProps, PageProps } from '../pageProps';
import { fetchFrontpage } from '../utils/sanity-fetch';

const Custom404 = (props: { page?: PageProps }) => (
    <>
        <Head>
            <title>Økonomi- og gjeldsrådgivning</title>
        </Head>
        <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={false} decoratorParts={props.page?.decorator}>
            <Panel className="section-panel section-panel__noIcon">
                <Innholdstittel>Denne siden finnes ikke</Innholdstittel>
                <p>
                    Prøv å gå tilbake til{' '}
                    <Link href="/">
                        <a className="lenke">forsiden</a>
                    </Link>
                    .
                </p>
            </Panel>
        </Layout>
    </>
);

interface StaticProps {
    props: {
        page: PageProps;
    };
}

export async function getStaticProps(): Promise<StaticProps> {
    const frontpage = await fetchFrontpage();
    const page = await getPageProps(frontpage.title, frontpage.metaDescription, '/', 'index');

    return {
        props: {
            page,
        },
    };
}

export default Custom404;
