import Head from 'next/head';
import { useRouter } from 'next/router';

import { Article } from '../../components/Article';
import { Layout } from '../../components/Layout';
import { LoadingPage } from '../../components/LoadingPage';
import { getPageProps, PageProps, StaticPathProps } from '../../pageProps';
import { SanityArticle } from '../../sanityDocumentTypes';
import { fetchArticleWithSlug, fetchFrontpage, getAllArticlesWithSlug } from '../../utils/sanity-fetch';
import Custom404 from '../404';

const ArticlePage = (props: { page?: PageProps; article?: SanityArticle }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <LoadingPage page={props.page} />;
    }
    if (!router.isFallback && Object.keys(props.article).length === 0) {
        return <Custom404 page={props.page} />;
    }
    return (
        <>
            <Head>
                <title>
                    {props.page.title} - {props.page.appTitle}
                </title>
                <meta property="og:title" content={`${props.page.title} - ${props.page.appTitle}`} />
                <meta name="Description" content={props.page.metaDescription} />
                <meta property="og:description" content={props.page.metaDescription} />
                <meta property="og:locale" content="nb" />
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
        page?: PageProps;
        article: SanityArticle;
    };
    revalidate: number;
}

export async function getStaticProps(props: { params: { slug: string } }): Promise<StaticProps> {
    const frontpage = await fetchFrontpage();
    const article = await fetchArticleWithSlug(props.params.slug);
    const page =
        Object.keys(article).length > 0
            ? await getPageProps(article.title, article.metaDescription, article.slug, 'article')
            : await getPageProps(frontpage.title, frontpage.metaDescription, '/', 'index');

    return {
        props: {
            page,
            article,
        },
        revalidate: 60,
    };
}

export default ArticlePage;
