import Head from 'next/head';
import { useRouter } from 'next/router';

import { Article } from '../../components/Article';
import { Layout } from '../../components/Layout';
import { MobileMenu } from '../../components/MobileMenu';
import { Sidebar } from '../../components/Sidebar';
import { getPageProps, PageProps, StaticPathProps } from '../../pageProps';
import { SanityArticle, SanityArticleGroup } from '../../sanityDocumentTypes';
import { fetchArticleGroupWithSlug, getAllArticleGroupsWithSlug } from '../../utils/sanity-fetch';
import Error from '../_error';

const ArticleGroupPage = (props: { page: PageProps; articleGroup: SanityArticleGroup; statusCode: number }) => {
    const router = useRouter();

    if (props.statusCode === 404) {
        return <Error />;
    }

    if (router.isFallback) {
        return (
            <>
                <Layout title="" isFrontPage={false}>
                    <></>
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
                <meta property="og:title" content={`${props.page.appTitle} - ${props.page.title}`} />
                <meta name="Description" content={props.page.metaDescription} />
                <meta property="og:description" content={props.page.metaDescription} />
                <meta property="og:locale" content="nb" />
            </Head>
            <Layout title={props.page.appTitle} isFrontPage={false} decoratorParts={props.page.decorator}>
                <div className="group-content">
                    <Sidebar articleGroup={props.articleGroup} />

                    <MobileMenu articleGroup={props.articleGroup} />

                    <div className="group-articles">
                        {props.articleGroup.articles?.map((article: SanityArticle) => (
                            <Article key={article.slug} article={article} />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export const getStaticPaths = async (): Promise<StaticPathProps> => {
    const articleGroupSlugs = await getAllArticleGroupsWithSlug();

    return {
        paths:
            articleGroupSlugs?.map((article) => ({
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
        articleGroup: SanityArticleGroup;
        statusCode: number;
    };
    revalidate: number;
}

export const getStaticProps = async (props: { params: { slug: string } }): Promise<StaticProps> => {
    const articleGroup = await fetchArticleGroupWithSlug(props.params.slug);
    const page = await getPageProps(articleGroup.title, articleGroup.metaDescription, articleGroup.slug, 'group');

    return {
        props: {
            page,
            articleGroup,
            statusCode: Object.keys(articleGroup).length === 0 ? 404 : 200,
        },

        revalidate: 60,
    };
};

export default ArticleGroupPage;
