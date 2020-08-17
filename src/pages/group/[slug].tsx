import Head from 'next/head';
import { Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

import { Layout } from '../../components/Layout';
import { Context } from '../../types';
import { ArticleGroupType, fetchArticleGroupWithSlug, ArticleType } from '../../utils/sanity-fetch';
import { SanityBlockContent } from '../../components/SanityBlockContent';

const ArticleGroup = (props: ArticleGroupType) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.title}</title>
            </Head>
            <Layout title={props.title} isFrontPage={false}>
                <>
                    {props.articles.map((article: ArticleType) => (
                        <Article key={article.slug} article={article} />
                    ))}
                </>
            </Layout>
        </>
    );
};

const Article = (props: { article: ArticleType }) => (
    <article>
        <Panel className="seksjon-panel">
            <Innholdstittel id={props.article.slug}>{props.article.title}</Innholdstittel>
            <SanityBlockContent blocks={props.article.body} />
        </Panel>
    </article>
);

ArticleGroup.getInitialProps = async (context: Context): Promise<ArticleGroupType> => {
    return await fetchArticleGroupWithSlug(context.query.slug);
};

export default ArticleGroup;
