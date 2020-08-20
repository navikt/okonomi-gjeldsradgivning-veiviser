import Head from 'next/head';

import { Layout } from '../../components/Layout';
import { Context } from '../../types';
import { fetchArticleGroupWithSlug } from '../../utils/sanity-fetch';
import { SanityArticleGroup, SanityArticle } from '../../sanityDocumentTypes';
import { Article } from '../../components/Article';
import { Sidebar } from '../../components/Sidebar';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const ArticleGroupPage = (props: { articleGroup: SanityArticleGroup }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.articleGroup.title}</title>
            </Head>
            <Layout title={props.articleGroup.title} isFrontPage={false}>
                <div className="group-content">
                    <Sidebar articleGroup={props.articleGroup} />
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

ArticleGroupPage.getInitialProps = async (context: Context): Promise<{ articleGroup: SanityArticleGroup }> => {
    const articleGroup = await fetchArticleGroupWithSlug(context.query.slug);
    return { articleGroup: articleGroup };
};

export default ArticleGroupPage;
