import { useRouter } from 'next/router';
import Head from 'next/head';
import MediaQuery from 'react-responsive';

import { Layout } from '../../components/Layout';
import { fetchArticleGroupWithSlug, fetchFrontpage, getAllArticleGroupsWithSlug } from '../../utils/sanity-fetch';
import { SanityArticleGroup, SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import { Sidebar } from '../../components/Sidebar';
import Error from '../_error';
import { MobileMenu } from '../../components/MobileMenu';
import { getPageProps, PageProps, StaticPathProps } from '../../pageProps';

const ArticleGroupPage = (props: { page: PageProps; articleGroup: SanityArticleGroup; statusCode: number }) => {
    if (props.statusCode === 404) {
        return <Error />;
    }

    const router = useRouter();

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
                <meta name="Description" content={props.page.metaDescription} />
            </Head>
            <Layout title={props.page.appTitle} isFrontPage={false} decoratorParts={props.page.decorator}>
                <div className="group-content">
                    <MediaQuery minWidth={1000}>
                        <Sidebar articleGroup={props.articleGroup} />
                    </MediaQuery>
                    <MediaQuery maxWidth={999}>
                        <MobileMenu articleGroup={props.articleGroup} />
                    </MediaQuery>
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
