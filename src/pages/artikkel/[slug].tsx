import Head from 'next/head';
import { useRouter } from 'next/router';

import { Article } from '../../components/Article';
import { Layout } from '../../components/Layout';
import { LoadingPage } from '../../components/LoadingPage';
import { usePreviewSubscription } from '../../lib/sanity/sanity';
import { getPageProps, PageProps, StaticPathProps } from '../../pageProps';
import { SanityArticle } from '../../sanityDocumentTypes';
import {
    articleWithSlugQuery,
    fetchArticleWithSlug,
    fetchFrontpage,
    getAllArticlesWithSlug,
} from '../../utils/sanity-fetch';
import Custom404 from '../404';

const ArticlePage = (props: { page?: PageProps; article?: SanityArticle; preview?: boolean }) => {
    const router = useRouter();

    const { data } = usePreviewSubscription(articleWithSlugQuery, {
        params: { slug: props.article?.slug, locale: 'nb' },
        initialData: props.article,
        enabled: props.preview,
    });

    if (router.isFallback) {
        return <LoadingPage page={props.page} />;
    }
    if (!router.isFallback && Object.keys(data).length === 0) {
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
            <Layout
                title={props.page.appTitle}
                isFrontPage={false}
                breadcrumbs={props.page.breadcrumbs}
                locales={data.languages}
            >
                <Article article={data} />
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
        preview: boolean;
        page?: PageProps;
        article: SanityArticle;
    };
    revalidate: number;
}

export async function getStaticProps(props: {
    locale: string;
    params: { slug: string };
    preview: boolean;
}): Promise<StaticProps> {
    const { preview = false } = props;
    const frontpage = await fetchFrontpage(props.locale);
    const article = await fetchArticleWithSlug(props.params.slug, props.locale);
    const page =
        Object.keys(article).length > 0
            ? await getPageProps(article.title, article.metaDescription, article.slug, 'article', props.locale)
            : await getPageProps(frontpage.title, frontpage.metaDescription, '/', 'index', props.locale);

    return {
        props: {
            preview,
            page,
            article,
        },
        revalidate: 60,
    };
}

export default ArticlePage;
