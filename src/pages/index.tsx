import Head from 'next/head';

import { fetchLinkPanels, fetchFrontpage, fetchArticleGroups, fetchArticlePanels } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';
import { SanityLinkPanel, SanityFrontpage, SanityArticleGroup, SanityArticlePanel } from '../sanityDocumentTypes';
import { LinkPanel } from '../components/LinkPanel';
import { ArticleGroupPanel } from '../components/ArticleGroupPanel';
import { ArticlePanel } from '../components/SituationPanel';
import { getPageProps, PageProps } from '../pageProps';

const Home = (props: {
    page: PageProps;
    frontpage: SanityFrontpage;
    articlePanels: SanityArticlePanel[];
    articleGroups: SanityArticleGroup[];
    linkPanels: SanityLinkPanel[];
}) => {
    return (
        <>
            {
                <Head>
                    <title>{props.page.appTitle}</title>
                    <meta property="og:title" content={props.page.appTitle} />
                    <meta name="Description" content={props.page.metaDescription} />
                    <meta property="og:description" content={props.page.metaDescription} />
                    <meta property="og:locale" content="nb" />
                </Head>
            }
            <Layout
                title={props.page.title}
                isFrontPage={true}
                bannerIconUrl={props.frontpage.bannerIconUrl}
                decoratorParts={props.page.decorator}
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
        page: PageProps;
        frontpage: SanityFrontpage;
        articlePanels: SanityArticlePanel[];
        articleGroups: SanityArticleGroup[];
        linkPanels: SanityLinkPanel[];
    };
    revalidate: number;
}

export const getStaticProps = async (): Promise<StaticProps> => {
    const frontpage = await fetchFrontpage();
    const articlePanels = await fetchArticlePanels();
    const articleGroups = await fetchArticleGroups();
    const linkPanels = await fetchLinkPanels();
    const page = await getPageProps(frontpage.title, frontpage.metaDescription, '/', 'index');

    return {
        props: { page, frontpage, articlePanels, articleGroups, linkPanels },
        revalidate: 60,
    };
};

export default Home;
