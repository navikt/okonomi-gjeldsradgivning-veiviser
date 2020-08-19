import { fetchArticleWithSlug } from '../../utils/sanity-fetch';
import { Context } from '../../types';
import { Layout } from '../../components/Layout';
import Head from 'next/head';
import { SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';

const ArticlePage = (props: { article: SanityArticle }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.article.title}</title>
            </Head>
            <Layout title={props.article.title} isFrontPage={false}>
                {props.article ? <Article article={props.article} /> : <div></div>}
            </Layout>
        </>
    );
};

ArticlePage.getInitialProps = async (context: Context): Promise<{ article: SanityArticle }> => {
    const article = await fetchArticleWithSlug(context.query.slug);
    return { article: article };
};

export default ArticlePage;
