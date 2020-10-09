import { useRouter } from 'next/router';
import { fetchArticleWithSlug, fetchFrontpage, getAllArticlesWithSlug } from '../../utils/sanity-fetch';
import { Layout } from '../../components/Layout';
import Head from 'next/head';
import { SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import Error from '../_error';
import { getPageProps, PageProps, StaticPathProps } from '../../pageProps';

const ArticlePage = (props: { page: PageProps; article: SanityArticle; statusCode: number }) => {
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
                <title>
                    {props.page.appTitle} - {props.page.title}
                </title>
                <meta name="Description" content={props.page.metaDescription} />
            </Head>
            <Layout title={props.page.appTitle} isFrontPage={false} decoratorParts={props.page.decorator}>
                <Article article={props.article} />
            </Layout>
        </>
    );
};

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
        page: PageProps;
        article: SanityArticle;
        statusCode: number;
    };
    revalidate: number;
}

export const getStaticProps = async (props: { params: { slug: string } }): Promise<StaticProps> => {
    const article = await fetchArticleWithSlug(props.params.slug);
    const page = await getPageProps(article.title, article.metaDescription, article.slug, 'article');

    return {
        props: {
            page,
            article,
            statusCode: Object.keys(article).length === 0 ? 404 : 200,
        },
        revalidate: 60,
    };
};

export default ArticlePage;
