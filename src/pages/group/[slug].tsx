import Head from 'next/head';
import MediaQuery from 'react-responsive';

import { Layout } from '../../components/Layout';
import { Context } from '../../types';
import { fetchArticleGroupWithSlug } from '../../utils/sanity-fetch';
import { SanityArticleGroup, SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import { Sidebar } from '../../components/Sidebar';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import Error from '../_error';
import { MobileMenu } from '../../components/MobileMenu';

const ArticleGroupPage = (props: { articleGroup: SanityArticleGroup; statusCode: number }) => {
    if (props.statusCode === 404) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.articleGroup.title}</title>
                <meta>{props.articleGroup.metaDescription}</meta>
            </Head>
            <Layout title={props.articleGroup.title} isFrontPage={false}>
                <div className="group-content">
                    <MediaQuery minWidth={1000}>
                        <Sidebar articleGroup={props.articleGroup} />
                    </MediaQuery>
                    <MediaQuery maxWidth={999}>
                        <MobileMenu articleGroup={props.articleGroup} />
                    </MediaQuery>
                    <div className="group-articles">
                        <Breadcrumbs title={props.articleGroup.title} />
                        {props.articleGroup.articles?.map((article: SanityArticle) => (
                            <Article key={article.slug} article={article} />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

ArticleGroupPage.getInitialProps = async (
    context: Context
): Promise<{ articleGroup: SanityArticleGroup; statusCode: number }> => {
    const articleGroup = await fetchArticleGroupWithSlug(context.query.slug);
    return { articleGroup: articleGroup, statusCode: Object.keys(articleGroup).length === 0 ? 404 : 200 };
};

export default ArticleGroupPage;
