import { BodyLong, Heading } from '@navikt/ds-react';
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
                <Heading level="1" size="xlarge" spacing>
                    Denne siden finnes ikke
                </Heading>
                <BodyLong spacing>
                    Prøv å gå tilbake til{' '}
                    <Link href="/">
                        <a className="navds-link">forsiden</a>
                    </Link>
                    .
                </BodyLong>
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
