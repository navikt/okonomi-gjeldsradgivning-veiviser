import { BodyLong, BodyShort, Heading, Link as DSLink } from '@navikt/ds-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { FrontpagePanel } from '../components/FrontpagePanel';
import { Layout } from '../components/Layout';
import { getPageProps, PageProps } from '../pageProps';
import { fetchFrontpage } from '../utils/sanity-fetch';

const Custom404 = (props: { page?: PageProps }) => (
    <>
        <Head>
            <title>Økonomi- og gjeldsrådgivning</title>
        </Head>
        <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={false} breadcrumbs={props.page.breadcrumbs}>
            <FrontpagePanel>
                <Heading level="1" size="large" spacing>
                    Fant ikke siden
                </Heading>
                <BodyShort spacing>
                    Beklager, siden kan være slettet eller flyttet, eller det var en feil i lenken som førte deg hit.
                </BodyShort>
                <BodyShort spacing>
                    Du kan <DSLink href="https://www.nav.no/">gå til forsiden</DSLink>, eller lese mer om{' '}
                    <Link href="/">
                        <a className="navds-link">økonomi- og gjeldsrådgivning</a>
                    </Link>
                    .
                </BodyShort>

                <Heading level="2" size="medium" spacing>
                    In English
                </Heading>
                <BodyShort spacing>The page you requested cannot be found.</BodyShort>
                <BodyShort spacing>
                    Go to the <DSLink href="https://www.nav.no/">front page</DSLink>, or read more about{' '}
                    <Link href="/en">
                        <a className="navds-link">økonomi- og gjeldsrådgivning</a>
                    </Link>
                    .
                </BodyShort>
            </FrontpagePanel>
        </Layout>
    </>
);

interface StaticProps {
    props: {
        page: PageProps;
    };
}

export async function getStaticProps({ locale }): Promise<StaticProps> {
    const frontpage = await fetchFrontpage(locale);
    const page = await getPageProps(frontpage.title, frontpage.metaDescription, '/', 'index', locale);

    return {
        props: {
            page,
        },
    };
}

export default Custom404;
