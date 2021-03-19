import { Button, Cell, ContentContainer, Grid } from '@navikt/ds-react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Panel from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components/macro';

import { PageBannerNewGrid } from '../components/PageBannerNewGrid';
import { SanityBlockContent } from '../components/SanityBlockContent';
import { getPageProps, PageProps } from '../pageProps';
import { SanityArticleGroup, SanityArticlePanel, SanityFrontpage, SanityLinkPanel } from '../sanityDocumentTypes';
import { digisosColors } from '../utils/colors';
import { fetchArticleGroups, fetchArticlePanels, fetchFrontpage, fetchLinkPanels } from '../utils/sanity-fetch';
import { useDecorator } from '../utils/useDecorator';

const StyledApp = styled.div`
    background-color: ${digisosColors.navGraa};
    padding-bottom: 5.625rem;
`;

const FrontPagePanel = styled(Panel)`
    padding: 1.5rem;
`;

const Home = (props: {
    page: PageProps;
    frontpage: SanityFrontpage;
    articlePanels: SanityArticlePanel[];
    articleGroups: SanityArticleGroup[];
    linkPanels: SanityLinkPanel[];
}) => {
    useDecorator();

    const router = useRouter();

    const handleButtonClick = (e: any, slug: string) => {
        e.preventDefault();
        router.push(`artikkel/${slug}`);
    };

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
                                                <Systemtittel>{panel.title}</Systemtittel>
                                                <SanityBlockContent blocks={panel.description} />
                                                <Button
                                                    onClick={(event) => handleButtonClick(event, panel.slug)}
                                                    variant="action"
                                                >
                                                    Gjeldsrådgivning fra NAV
                                                </Button>
                                            </div>
                                            <PanelImageContainer>
                                                <img src={panel.iconUrl} alt="" />
                                            </PanelImageContainer>
                                        </FlexContainer>
                                    </FrontPagePanel>
                                </Cell>
                            );
                        })}
                        {props.articlePanels.map((panel) => {
                            return panel.articles.map((article) => {
                                return (
                                    <Cell xs={12} md={6} lg={4} key={article.slug}>
                                        <FrontPageLinkPanel {...article} />
                                    </Cell>
                                );
                            });
                        })}

                        {props.articleGroups.map((articleGroup) => {
                            return (
                                <React.Fragment key={articleGroup.id}>
                                    <Cell xs={12}>
                                        <HeadingWithLine>
                                            <Line />
                                            <Systemtittel>{articleGroup.title}</Systemtittel>
                                            <Line />
                                        </HeadingWithLine>
                                    </Cell>
                                    {articleGroup.articles.map((article) => {
                                        return (
                                            <Cell xs={12} md={6} lg={6} key={article.slug}>
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

const LinkPanel = styled.a`
    padding: 1.25rem;
    cursor: pointer;
    margin-bottom: 0;
    height: calc(100% - 2.5rem);

    /*.typo-systemtittel {
        color: #0067c5;
    }*/
`;

const HeadingWithLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin-top: 2rem;

    @media screen and (min-width: 480px) {
        .typo-systemtittel {
            margin: 0 2rem;
        }
    }
`;

const Line = styled.span`
    @media screen and (min-width: 480px) {
        flex: 1;
        border: 1px solid #78706a;
    }
`;

const FrontPageLinkPanel = (article: { title: string; slug: string; description: string }) => {
    return (
        <LenkepanelBase
            key={article.slug}
            href={`/artikkel/${article.slug}`}
            linkCreator={(linkProps) => (
                <Link href="/artikkel/[slug]" as={linkProps.href} passHref>
                    <LinkPanel className="lenkepanel">
                        <div>
                            <Systemtittel className="lenkepanel__heading" tag="p">
                                {article.title}
                            </Systemtittel>
                            <p>{article.description}</p>
                        </div>
                        <span className="lenkepanel__indikator" />
                    </LinkPanel>
                </Link>
            )}
        >
            <></>
        </LenkepanelBase>
    );
};

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
        max-width: 80ch;
        max-width: 51rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
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
