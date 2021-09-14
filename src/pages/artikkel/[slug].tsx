import Head from 'next/head';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';

import { Article } from '../../components/Article';
import { Layout } from '../../components/Layout';
import { LoadingPage } from '../../components/LoadingPage';
import { getBreadcrumbsForArticle, StaticPathProps } from '../../pageProps';
import { SanityArticle } from '../../sanityDocumentTypes';
import sanityClient, { usePreviewSubscription } from '../../utils/sanity-client';
import { articleSpec, getAllArticlesWithSlug } from '../../utils/sanity-fetch';
import Custom404 from '../404';

const query = groq`{
    "frontpage": *[_id == "frontpage"][0]{
        "title": coalesce(title[$locale], title.nb),
        "metaDescription": coalesce(metaDescription[$locale], metaDescription.nb),
    },
    "article": *[_type == "article" && slug.current == $slug][0]${articleSpec}
}`;

interface Props {
    data: { frontpage: { title: string; metaDescription: string }; article?: SanityArticle };
    params: { locale: string; slug: string };
    preview: boolean;
}

const ArticlePage = (props: Props) => {
    const { data } = usePreviewSubscription(query, {
        initialData: props.data,
        params: props.params,
        enabled: props.preview,
    });

    const router = useRouter();

    if (router.isFallback) {
        return <LoadingPage page={{ appTitle: '', title: '', metaDescription: '', slug: '/' }} />;
    }
    if (!router.isFallback && !data.article) {
        return (
            <Custom404
                page={{
                    appTitle: data.frontpage.title,
                    title: data.frontpage.title,
                    metaDescription: data.frontpage.metaDescription,
                    slug: '/',
                }}
            />
        );
    }

    return (
        <>
            <Head>
                <title>
                    {data.article.title} - {data.frontpage.title}
                </title>
                <meta property="og:title" content={`${data.article.title} - ${data.frontpage.title}`} />
                <meta name="Description" content={data.article.metaDescription} />
                <meta property="og:description" content={data.article.metaDescription} />
                <meta property="og:locale" content="nb" />
            </Head>
            <Layout
                title={data.frontpage.title}
                isFrontPage={false}
                breadcrumbs={getBreadcrumbsForArticle(data.article.title, props.params.locale, data.article.slug)}
                locales={data.article.languages}
            >
                <Article article={data.article} />
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
    props: Props;
    revalidate: number;
}

export async function getStaticProps(props: {
    locale: string;
    params: { slug: string };
    preview: boolean;
}): Promise<StaticProps> {
    const params = { slug: props.params.slug, locale: props.locale };
    const { preview = false } = props;
    const data = await sanityClient.fetch(query, params);
    return {
        props: {
            data,
            params,
            preview,
        },
        revalidate: 60,
    };
}

export default ArticlePage;
