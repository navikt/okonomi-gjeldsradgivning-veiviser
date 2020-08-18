import Link from 'next/link';
import { Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { fetchArticlesForFrontpage } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';
import Head from 'next/head';
import { SanityFrontPageArticle } from '../sanityDocumentTypes';

const Home = (props: { articles: SanityFrontPageArticle[] }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning</title>
            </Head>
            <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={true}>
                <Panel className="seksjon-panel">
                    <Innholdstittel>Other posts</Innholdstittel>
                    {props.articles.map((article, index) => (
                        <Link key={index} href="/articles/[slug]" as={`/articles/${article.slug}`}>
                            <a>{article.title}</a>
                        </Link>
                    ))}
                </Panel>
            </Layout>
        </>
    );
};

Home.getInitialProps = async (): Promise<{ articles: SanityFrontPageArticle[] }> => {
    const articles = await fetchArticlesForFrontpage();
    return { articles: articles };
};

export default Home;
