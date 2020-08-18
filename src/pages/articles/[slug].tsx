import { Sidetittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { fetchArticleWithSlug } from '../../utils/sanity-fetch';
import { SanityBlockContent } from '../../components/SanityBlockContent';
import { Context } from '../../types';
import { Layout } from '../../components/Layout';
import Head from 'next/head';
import { SanityArticle } from '../../sanityDocumentTypes';

const Article = (props: { article: SanityArticle }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning - {props.article.title}</title>
            </Head>
            <Layout title={props.article.title} isFrontPage={false}>
                <article>
                    <Panel className="seksjon-panel">
                        <Sidetittel>{props.article.title}</Sidetittel>
                        <p>Posted in: {props.article.categories?.map((category) => category)}</p>
                        <SanityBlockContent blocks={props.article.body} />
                    </Panel>
                </article>
            </Layout>
        </>
    );
};

Article.getInitialProps = async (context: Context): Promise<{ article: SanityArticle }> => {
    const article = await fetchArticleWithSlug(context.query.slug);
    return { article: article };
};

export default Article;
