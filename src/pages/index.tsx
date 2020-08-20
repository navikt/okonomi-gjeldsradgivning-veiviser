import Link from 'next/link';
import Head from 'next/head';
import { Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

import { fetchArticlesForFrontpage } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';

import { SanityFrontPageArticle } from '../sanityDocumentTypes';

const Home = (props: { articles: SanityFrontPageArticle[] }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning</title>
            </Head>
            <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={true}>
                <Panel className="section-panel">
                    <Innholdstittel>Ta kontroll på økonomien din</Innholdstittel>
                    <Link href="/group/ta-kontroll-pa-okonomien-din">
                        <a className="lenke">Ta kontroll på økonomien din</a>
                    </Link>
                    <Innholdstittel>Other posts</Innholdstittel>
                    <ul>
                        {props.articles.map((article, index) => (
                            <li key={index}>
                                <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                                    <a className="lenke">{article.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
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
