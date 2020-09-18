import Head from 'next/head';

import { fetchLinkPanels, fetchFrontpage, fetchArticleGroups, fetchArticlePanels } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';
import { SanityLinkPanel, SanityFrontpage, SanityArticleGroup, SanityArticlePanel } from '../sanityDocumentTypes';
import { LinkPanel } from '../components/LinkPanel';
import { ArticleGroupPanel } from '../components/ArticleGroupPanel';
import { ArticlePanel } from '../components/ArticlePanel';
import { fetchDecoratorParts, DecoratorParts } from '../utils/dekorator';

const Home = (props: {
    frontpage: SanityFrontpage;
    articlePanels: SanityArticlePanel[];
    articleGroups: SanityArticleGroup[];
    linkPanels: SanityLinkPanel[];
    decoratorParts: DecoratorParts;
}) => {
    return (
        <>
            {
                <Head>
                    <title>{props.frontpage.title}</title>
                    <meta name="Description" content={props.frontpage.metaDescription} />
                </Head>
            }
            <Layout
                title={props.frontpage.title}
                isFrontPage={true}
                bannerIconUrl={props.frontpage.bannerIconUrl}
                decoratorParts={props.decoratorParts}
            >
                <>
                    {props.frontpage.panels.map((panel) => {
                        if (panel._type === 'articleGroup') {
                            return props.articleGroups
                                .filter((articleGroup) => articleGroup.id === panel._id)
                                .map((articleGroup) => (
                                    <ArticleGroupPanel key={panel._id} articleGroup={articleGroup} />
                                ));
                        }
                        if (panel._type === 'linkPanel') {
                            return props.linkPanels
                                .filter((linkPanel) => linkPanel.id === panel._id)
                                .map((linkPanel) => <LinkPanel key={panel._id} linkPanel={linkPanel} />);
                        }
                        if (panel._type === 'articlePanel') {
                            return props.articlePanels
                                .filter((articlePanel) => articlePanel.id === panel._id)
                                .map((articlePanel) => <ArticlePanel key={panel._id} articlePanel={articlePanel} />);
                        }
                    })}
                </>
            </Layout>
        </>
    );
};

interface StaticProps {
    props: {
        frontpage: SanityFrontpage;
        articlePanels: SanityArticlePanel[];
        articleGroups: SanityArticleGroup[];
        linkPanels: SanityLinkPanel[];
        decoratorParts: DecoratorParts;
    };
    revalidate: number;
}

export const getStaticProps = async (): Promise<StaticProps> => {
    const frontpage = await fetchFrontpage();
    const articlePanels = await fetchArticlePanels();
    const articleGroups = await fetchArticleGroups();
    const linkPanels = await fetchLinkPanels();
    const decoratorParts = await fetchDecoratorParts({ cacheKey: 'index', breadcrumbs: [] });

    return { props: { frontpage, articlePanels, articleGroups, linkPanels, decoratorParts }, revalidate: 60 };
};

export default Home;
