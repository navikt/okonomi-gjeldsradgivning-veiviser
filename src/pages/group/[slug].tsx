import Head from 'next/head';
import { Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

import { Layout } from '../../components/Layout';
import { Context } from '../../types';
import { fetchArticleGroupWithSlug } from '../../utils/sanity-fetch';
import { SanityBlockContent } from '../../components/SanityBlockContent';
import { SanityArticleGroup, SanityArticle } from '../../sanityDocumentTypes';

const ArticleGroup = (props: { articleGroup: SanityArticleGroup }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.articleGroup.title}</title>
            </Head>
            <Layout title={props.articleGroup.title} isFrontPage={false}>
                <>
                    {props.articleGroup.articles?.map((article: SanityArticle) => (
                        <Article key={article.slug} article={article} />
                    ))}
                </>
            </Layout>
        </>
    );
};

const Article = (props: { article: SanityArticle }) => (
    <article>
        <Panel className="seksjon-panel">
            <Innholdstittel id={props.article.slug}>{props.article.title}</Innholdstittel>
            <SanityBlockContent blocks={props.article.body} />
        </Panel>
    </article>
);

ArticleGroup.getInitialProps = async (context: Context): Promise<{ articleGroup: SanityArticleGroup }> => {
    const articleGroup = await fetchArticleGroupWithSlug(context.query.slug);
    return { articleGroup: articleGroup };
};

export default ArticleGroup;
