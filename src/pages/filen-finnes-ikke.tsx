import { BodyLong, Heading } from '@navikt/ds-react';
import Head from 'next/head';

import { FrontpagePanel } from '../components/FrontpagePanel';
import { Layout } from '../components/Layout';
import { getPageProps, PageProps } from '../pageProps';
import { fetchFrontpage } from '../utils/sanity-fetch';

const Home = (props: { page: PageProps }) => {
    return (
        <>
            {
                <Head>
                    <title>{props.page.appTitle}</title>
                    <meta name="Description" content={props.page.metaDescription} />
                </Head>
            }
            <Layout title={props.page.title} isFrontPage={false} breadcrumbs={props.page.breadcrumbs}>
                <FrontpagePanel>
                    <Heading level="1" size="large" spacing>
                        Filen finnes ikke
                    </Heading>
                    <BodyLong spacing>Fant ikke filen</BodyLong>
                </FrontpagePanel>
            </Layout>
        </>
    );
};

interface StaticProps {
    props: {
        page: PageProps;
    };
    revalidate: number;
}

export const getStaticProps = async ({ locale }): Promise<StaticProps> => {
    const frontpage = await fetchFrontpage(locale);
    const page = await getPageProps(
        'Filen finnes ikke',
        frontpage.metaDescription,
        '/filen-finnes-ikke',
        'article',
        locale
    );

    return {
        props: { page },
        revalidate: 60,
    };
};

export default Home;
