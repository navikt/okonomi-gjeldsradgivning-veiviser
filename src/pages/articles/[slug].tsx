import { fetchArticleWithSlug } from '../../utils/sanity-fetch';
import { Context } from '../../types';
import { Layout } from '../../components/Layout';
import Head from 'next/head';
import { SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import Error from '../_error';

const ArticlePage = (props: { article: SanityArticle; statusCode: number }) => {
    if (props.statusCode === 404) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.article.title}</title>
                <meta name="Description" content={props.article.metaDescription} />
            </Head>
            <Layout title={props.article.title} isFrontPage={false}>
                <>
                    <Breadcrumbs title={props.article.title} />
                    {props.article ? <Article article={props.article} /> : <div></div>}
                </>
            </Layout>
        </>
    );
};

ArticlePage.getInitialProps = async (context: Context): Promise<{ article: SanityArticle; statusCode: number }> => {
    const article = await fetchArticleWithSlug(context.query.slug);
    return { article: article, statusCode: Object.keys(article).length === 0 ? 404 : 200 };
};

export default ArticlePage;
