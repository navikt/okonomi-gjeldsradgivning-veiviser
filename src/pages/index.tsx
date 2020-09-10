import Head from 'next/head';

import { fetchLinkPanels, fetchFrontpage, fetchArticleGroups, fetchArticlePanels } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';
import { SanityLinkPanel, SanityFrontpage, SanityArticleGroup, SanityArticlePanel } from '../sanityDocumentTypes';
import { LinkPanel } from '../components/LinkPanel';
import { ArticleGroupPanel } from '../components/ArticleGroupPanel';
import { ArticlePanel } from '../components/ArticlePanel';

const Home = (props: {
    frontpage: SanityFrontpage;
    articlePanels: SanityArticlePanel[];
    articleGroups: SanityArticleGroup[];
    linkPanels: SanityLinkPanel[];
}) => {
    return (
        <>
            <Head>
                <title>{props.frontpage.title}</title>
                <meta name="Description" content={props.frontpage.metaDescription} />
            </Head>
            <Layout title={props.frontpage.title} isFrontPage={true} bannerIconUrl={props.frontpage.bannerIconUrl}>
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

Home.getInitialProps = async (): Promise<{
    frontpage: SanityFrontpage;
    articlePanels: SanityArticlePanel[];
    articleGroups: SanityArticleGroup[];
    linkPanels: SanityLinkPanel[];
}> => {
    const frontpage = await fetchFrontpage();
    const articlePanels = await fetchArticlePanels();
    const articleGroups = await fetchArticleGroups();
    const linkPanels = await fetchLinkPanels();

    return { frontpage, articlePanels, articleGroups, linkPanels };
};

export default Home;
