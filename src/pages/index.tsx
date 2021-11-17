import { Button, Cell, ContentContainer, Grid, Heading, Panel } from '@navikt/ds-react';
import Head from 'next/head';
import Link from 'next/link';
import { groq } from 'next-sanity';
import React from 'react';
import styled from 'styled-components';

import { FrontPageLinkPanel } from '../components/FrontPageLinkPanel';
import { PageBannerNewGrid } from '../components/PageBannerNewGrid';
import { SanityBlockContent } from '../components/SanityBlockContent';
import { SanityArticleGroup, SanityArticlePanel, SanityFrontpage, SanityLinkPanel } from '../sanityDocumentTypes';
import { digisosColors } from '../utils/colors';
import sanityClient, { usePreviewSubscription } from '../utils/sanity-client';
import { articleGroupSpec, articlePanelSpec, linkPanelSpec } from '../utils/sanity-fetch';
import { useDecorator } from '../utils/useDecorator';

const StyledApp = styled.div`
    background-color: var(--navds-color-gray-10);
    padding-bottom: 5.625rem;
`;

const FrontPagePanel = styled(Panel)`
    padding: 1.5rem;
`;

const query = groq`{
    "frontpage": *[_id == "frontpage"][0]
    {
        "title": coalesce(title[$locale], title.nb),
        languages,
        "metaDescription": coalesce(metaDescription[$locale], metaDescription.nb),
        "bannerIconUrl": bannerIcon.asset->url,
    },
    "articlePanels": *[_type == "articlePanel"]
    ${articlePanelSpec},
    "articleGroups": *[_type == "articleGroup"]
    ${articleGroupSpec},
    "linkPanels": *[_type == "linkPanel"]
    ${linkPanelSpec},
}`;

interface Props {
    data: {
        frontpage: SanityFrontpage;
        articlePanels: SanityArticlePanel[];
        articleGroups: SanityArticleGroup[];
        linkPanels: SanityLinkPanel[];
    };
    params: {
        locale: string;
    };
    preview: boolean;
}

const Home = (props: Props) => {
    const { data } = usePreviewSubscription(query, {
        initialData: props.data,
        params: props.params,
        enabled: props.preview,
    });

    useDecorator(undefined, data.frontpage.languages);

    return (
        <div id="app" className="app">
            {
                <Head>
                    <title>{data.frontpage.title}</title>
                    <meta property="og:title" content={data.frontpage.title} />
                    <meta name="Description" content={data.frontpage.metaDescription} />
                    <meta property="og:description" content={data.frontpage.metaDescription} />
                    <meta property="og:locale" content="nb" />
                </Head>
            }
            <StyledApp>
                <PageBannerNewGrid title={data.frontpage.title} iconUrl={data.frontpage.bannerIconUrl} />
                <ContentContainer>
                    <Grid>
                        {data.linkPanels.map((panel) => {
                            return (
                                <Cell xs={12} key={panel.id}>
                                    <FrontPagePanel>
                                        <FlexContainer>
                                            <div>
                                                <Heading level="2" size="medium" spacing>
                                                    {panel.title}
                                                </Heading>
                                                <SanityBlockContent blocks={panel.description} />
                                                <Link href={`/artikkel/${panel.slug}`} passHref>
                                                    <Button variant="primary" as="a">
                                                        Kontakt oss
                                                    </Button>
                                                </Link>
                                            </div>
                                            <PanelImageContainer>
                                                {/* eslint-disable-next-line @next/next/no-img-element*/}
                                                <img src={panel.iconUrl} alt="" />
                                            </PanelImageContainer>
                                        </FlexContainer>
                                    </FrontPagePanel>
                                </Cell>
                            );
                        })}
                        {data.articlePanels.map((panel) => {
                            return panel.articles.map((article) => {
                                return (
                                    <Cell xs={12} lg={4} key={article.slug}>
                                        <FrontPageLinkPanel {...article} />
                                    </Cell>
                                );
                            });
                        })}

                        {data.articleGroups.map((articleGroup) => {
                            return (
                                <React.Fragment key={articleGroup.id}>
                                    <Cell xs={12}>
                                        <HeadingWithLine>
                                            <Line />
                                            <Heading level="2" size="medium">
                                                {articleGroup.title}
                                            </Heading>
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
        .navds-heading {
            margin: 0 2rem;
        }
    }
`;

const Line = styled.span`
    @media screen and (min-width: 480px) {
        flex: 1;
        height: 0px;
        border-bottom: 1px solid #78706a;
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
    props: Props;
    revalidate: number;
}

export const getStaticProps = async ({ locale, preview = false }): Promise<StaticProps> => {
    const params = { locale };
    const data = await sanityClient.fetch(query, params);

    return {
        props: { data, params, preview },
        revalidate: 60,
    };
};

export default Home;
