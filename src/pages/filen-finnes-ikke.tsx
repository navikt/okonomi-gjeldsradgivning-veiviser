import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
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
            <Layout title={props.page.title} isFrontPage={false} decoratorParts={props.page.decorator}>
                <FrontpagePanel>
                    <Innholdstittel>Filen finnes ikke</Innholdstittel>
                    <Normaltekst>Fant ikke filen</Normaltekst>
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

export const getStaticProps = async (): Promise<StaticProps> => {
    const frontpage = await fetchFrontpage();
    const page = await getPageProps('Filen finnes ikke', frontpage.metaDescription, '/filen-finnes-ikke', 'article');

    return {
        props: { page },
        revalidate: 60,
    };
};

export default Home;
