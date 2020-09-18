import { useRouter } from 'next/router';
import Head from 'next/head';
import MediaQuery from 'react-responsive';

import { Layout } from '../../components/Layout';
import { fetchArticleGroupWithSlug, getAllArticleGroupsWithSlug } from '../../utils/sanity-fetch';
import { SanityArticleGroup, SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import { Sidebar } from '../../components/Sidebar';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import Error from '../_error';
import { MobileMenu } from '../../components/MobileMenu';
import { fetchDecoratorParts, DecoratorParts } from '../../utils/dekorator';

const ArticleGroupPage = (props: {
    articleGroup: SanityArticleGroup;
    decoratorParts: DecoratorParts;
    statusCode: number;
}) => {
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
                <title>Økonomi- og gjeldsrådgivning - {props.articleGroup.title}</title>
                <meta name="Description" content={props.articleGroup.metaDescription} />
            </Head>
            <Layout title={props.articleGroup.title} isFrontPage={false} decoratorParts={props.decoratorParts}>
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

interface StaticPathProps {
    paths: { params: { slug: string } }[];
    fallback: boolean;
}

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
        articleGroup: SanityArticleGroup;
        decoratorParts: DecoratorParts;
        statusCode: number;
    };
    revalidate: number;
}

export const getStaticProps = async (props: { params: { slug: string } }): Promise<StaticProps> => {
    const articleGroup = await fetchArticleGroupWithSlug(props.params.slug);
    const decoratorParts = await fetchDecoratorParts({
        cacheKey: `group-${articleGroup.slug}`,
        breadcrumbs: [{ title: articleGroup.title, url: process.env.APP_URL + '/group/' + articleGroup.slug }],
    });
    return {
        props: { articleGroup, decoratorParts, statusCode: Object.keys(articleGroup).length === 0 ? 404 : 200 },
        revalidate: 60,
    };
};

export default ArticleGroupPage;
