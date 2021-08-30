import { BodyShort, Cell, ContentContainer, Grid, Panel, Title } from '@navikt/ds-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components/macro';

import { FrontPageLinkPanel } from '../components/FrontPageLinkPanel';
import { PageBannerNewGrid } from '../components/PageBannerNewGrid';
import { SanityBlockContent } from '../components/SanityBlockContent';
import { getPageProps, PageProps } from '../pageProps';
import { SanityArticleGroup, SanityArticlePanel, SanityFrontpage, SanityLinkPanel } from '../sanityDocumentTypes';
import { digisosColors } from '../utils/colors';
import { fetchArticleGroups, fetchArticlePanels, fetchFrontpage, fetchLinkPanels } from '../utils/sanity-fetch';
import { useDecorator } from '../utils/useDecorator';

const StyledApp = styled.div`
    background-color: var(--navds-color-gray-10);
    padding-bottom: 5.625rem;
`;

const FrontPagePanel = styled(Panel)`
    padding: 1.5rem;
`;

const columnLayoutToColumn = (layout: number) => {
    if (layout === 2) return 6;
    if (layout === 3) return 4;
    return 12;
};

const Home = (props: {
    page: PageProps;
    frontpage: SanityFrontpage;
    articlePanels: SanityArticlePanel[];
    articleGroups: SanityArticleGroup[];
    linkPanels: SanityLinkPanel[];
}) => {
    useDecorator();

    return (
        <div id="app" className="app">
            {
                <Head>
                    <title>{props.page.appTitle}</title>
                    <meta property="og:title" content={props.page.appTitle} />
                    <meta name="Description" content={props.page.metaDescription} />
                    <meta property="og:description" content={props.page.metaDescription} />
                    <meta property="og:locale" content="nb" />
                </Head>
            }
            <StyledApp>
                <PageBannerNewGrid title={props.page.title} iconUrl={props.frontpage.bannerIconUrl} />
                <ContentContainer>
                    <Grid>
                        {props.linkPanels.map((panel) => {
                            return (
                                <Cell xs={12} key={panel.id}>
                                    <FrontPagePanel>
                                        <FlexContainer>
                                            <div>
                                                <Title level={2} size="m" spacing>
                                                    {panel.title}
                                                </Title>
                                                <SanityBlockContent blocks={panel.description} />
                                                <Link href={`/artikkel/${panel.slug}`}>
                                                    <a className="navds-button navds-button--action navds-button--medium">
                                                        <BodyShort size="m">Kontakt oss</BodyShort>
                                                    </a>
                                                </Link>
                                            </div>
                                            <PanelImageContainer>
                                                <img src={panel.iconUrl} alt="" />
                                            </PanelImageContainer>
                                        </FlexContainer>
                                    </FrontPagePanel>
                                </Cell>
                            );
                        })}
                        {!props.frontpage.useLocalizedFrontpagePanels &&
                            props.articlePanels.map((panel) => {
                                return panel.articles.map((article) => {
                                    return (
                                        <Cell xs={12} lg={4} key={article.slug}>
                                            <FrontPageLinkPanel {...article} />
                                        </Cell>
                                    );
                                });
                            })}

                        {!props.frontpage.useLocalizedFrontpagePanels &&
                            props.articleGroups.map((articleGroup) => {
                                return (
                                    <React.Fragment key={articleGroup.id}>
                                        <Cell xs={12}>
                                            <HeadingWithLine>
                                                <Line />
                                                <Title level={2} size="m">
                                                    {articleGroup.title}
                                                </Title>
                                                <Line />
                                            </HeadingWithLine>
                                        </Cell>
                                        {articleGroup.articles.map((article) => {
                                            return (
                                                <Cell xs={12} lg={6} key={article.slug}>
                                                    <FrontPageLinkPanel {...article} />
                                                </Cell>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        {props.frontpage.useLocalizedFrontpagePanels &&
                            props.frontpage.frontpagePanels?.map((frontpagePanel) => {
                                return (
                                    <React.Fragment key={frontpagePanel.id}>
                                        {frontpagePanel.withTitle && (
                                            <Cell xs={12}>
                                                <HeadingWithLine>
                                                    <Line />
                                                    <Title level={2} size="m">
                                                        {frontpagePanel.title}
                                                    </Title>
                                                    <Line />
                                                </HeadingWithLine>
                                            </Cell>
                                        )}
                                        {frontpagePanel.articles.map((article) => {
                                            return (
                                                <Cell
                                                    xs={12}
                                                    lg={columnLayoutToColumn(frontpagePanel.columnLayout)}
                                                    key={article.slug}
                                                >
                                                    <FrontPageLinkPanel {...article} />
                                                </Cell>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                    </Grid>
                </ContentContainer>
            </StyledApp>
        </div>
    );
};

const HeadingWithLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin-top: 2rem;

    @media screen and (min-width: 480px) {
        .navds-title {
            margin: 0 2rem;
        }
    }
`;

const Line = styled.span`
    @media screen and (min-width: 480px) {
        flex: 1;
        height: 0px;
        border: 1px solid #78706a;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
        max-width: 80ch;
        max-width: 51rem;
    }
`;

const PanelImageContainer = styled.div`
    @media screen and (max-width: 470px) {
        display: none;
    }
    background-color: ${digisosColors.digisosLysGronn};
    border-radius: 50%;
    overflow: hidden;

    height: 8.25rem;
    width: 8.25rem;
    min-width: 8.25rem;

    img {
        min-width: 8.25rem;
        width: 8.25rem;
        height: 8.25rem;
        align-self: center;
    }
`;

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
