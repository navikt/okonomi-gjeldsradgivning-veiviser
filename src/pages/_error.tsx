import { BodyLong, Heading } from '@navikt/ds-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { FrontpagePanel } from '../components/FrontpagePanel';
import { Layout } from '../components/Layout';

const Custom404 = () => (
    <>
        <Head>
            <title>Økonomi- og gjeldsrådgivning</title>
        </Head>
        <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={true}>
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

export default Custom404;
