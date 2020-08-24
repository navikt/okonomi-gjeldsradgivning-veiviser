import Link from 'next/link';
import Head from 'next/head';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

import { fetchArticlesForFrontpage, fetchArticleGroupsForFrontpage } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';

import { SanityFrontPageArticle, SanityFrontPageArticleGroup } from '../sanityDocumentTypes';
import { SanityBlockContent } from '../components/SanityBlockContent';

const Home = (props: { articles: SanityFrontPageArticle[]; articleGroups: SanityFrontPageArticleGroup[] }) => {
    return (
        <>
            <Head>
                <title>Økonomi- og gjeldsrådgivning</title>
            </Head>
            <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={true}>
                <>
                    {props.articleGroups?.map((articleGroup: SanityFrontPageArticleGroup) => (
                        <Panel key={articleGroup.slug} className="section-panel section-panel__noIcon">
                            <Innholdstittel>{articleGroup.title}</Innholdstittel>
                            <SanityBlockContent blocks={articleGroup.description} />
                            <div className="section-article__wrapper">
                                {articleGroup.articles?.map((article) => (
                                    <div
                                        key={article.slug}
                                        className="section-article__article-box section-article__wrapper"
                                    >
                                        <img className="section-article__icon" src={article.iconUrl} />
                                        <div className="section-article__content">
                                            <Link href="group/[slug]" as={`group/${articleGroup.slug}#${article.slug}`}>
                                                <a className="lenke">{article.title}</a>
                                            </Link>
                                            <Normaltekst>{article.description}</Normaltekst>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    ))}
                    <Panel className="section-panel section-panel__noIcon">
                        <Innholdstittel>Har du økonomiske bekymringer?</Innholdstittel>
                        <div className="section-article__wrapper">
                            {props.articles.map((article, index) => (
                                <div
                                    key={article.slug}
                                    className="section-article__article-box section-article__wrapper"
                                >
                                    <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                                        <a className="lenke">{article.title}</a>
                                    </Link>
                                    <Normaltekst>{article.description}</Normaltekst>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </>
            </Layout>
        </>
    );
};

Home.getInitialProps = async (): Promise<{
    articles: SanityFrontPageArticle[];
    articleGroups: SanityFrontPageArticleGroup[];
}> => {
    const articles = await fetchArticlesForFrontpage();
    const articleGroups = await fetchArticleGroupsForFrontpage();
    return { articles: articles, articleGroups: articleGroups };
};

export default Home;
