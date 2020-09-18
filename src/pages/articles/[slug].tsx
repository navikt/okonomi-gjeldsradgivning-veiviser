import { useRouter } from 'next/router';
import { fetchArticleWithSlug, getAllArticlesWithSlug } from '../../utils/sanity-fetch';
import { Layout } from '../../components/Layout';
import Head from 'next/head';
import { SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import Error from '../_error';
import { fetchDecoratorParts, DecoratorParts } from '../../utils/dekorator';

const ArticlePage = (props: { article: SanityArticle; decoratorParts: DecoratorParts; statusCode: number }) => {
    if (props.statusCode === 404) {
        return <Error />;
    }

    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <Layout title="" isFrontPage={false}>
                    <>Loading...</>
                </Layout>
            </>
        );
    }
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.article.title}</title>
                <meta name="Description" content={props.article.metaDescription} />
            </Head>
            <Layout title={props.article.title} isFrontPage={false} decoratorParts={props.decoratorParts}>
                <>{props.article ? <Article article={props.article} /> : <div></div>}</>
            </Layout>
        </>
    );
};

interface StaticPathProps {
    paths: { params: { slug: string } }[];
    fallback: boolean;
}

export const getStaticPaths = async (): Promise<StaticPathProps> => {
    const articleSlugs = await getAllArticlesWithSlug();

    return {
        paths:
            articleSlugs?.map((article) => ({
                params: {
                    slug: article.slug,
                },
            })) || [],
        fallback: true,
    };
};

interface StaticProps {
    props: {
        article: SanityArticle;
        decoratorParts: DecoratorParts;
        statusCode: number;
    };
    revalidate: number;
}

export const getStaticProps = async (props: { params: { slug: string } }): Promise<StaticProps> => {
    const article = await fetchArticleWithSlug(props.params.slug);
    const decoratorParts = await fetchDecoratorParts({
        cacheKey: `article-${article.slug}`,
        breadcrumbs: [{ title: article.title, url: process.env.APP_URL + '/articles/' + article.slug }],
    });
    return {
        props: { article, decoratorParts, statusCode: Object.keys(article).length === 0 ? 404 : 200 },
        revalidate: 60,
    };
};

export default ArticlePage;
