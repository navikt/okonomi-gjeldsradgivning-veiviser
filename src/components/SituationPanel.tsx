import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { SanityArticlePanel } from '../sanityDocumentTypes';
import { FrontpagePanel } from './FrontpagePanel';

const ArticleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Divider = styled.div`
    width: 100px;
    margin: 1rem 0rem 2rem 0rem;
    border: 1px solid #79706b;
`;

const LinkPanel = styled.a`
    width: 26.375rem;
    padding: 2rem 1rem !important;
    cursor: pointer;

    @media screen and (min-width: 1024px) {
        width: 26.375rem;
    }

    @media screen and (max-width: 1023px) {
        width: 100%;
    }

    .typo-undertittel {
        margin-block-start: 0rem;
    }
`;

export const SituationPanel = (props: { articlePanel: SanityArticlePanel }) => (
    <FrontpagePanel>
        <HeaderWrapper>
            <Systemtittel>{props.articlePanel.title}</Systemtittel>
            <Divider />
        </HeaderWrapper>
        <ArticleWrapper>
            {props.articlePanel.articles.map((article) => (
                <LenkepanelBase
                    key={article.slug}
                    href={`/artikkel/${article.slug}`}
                    linkCreator={(linkProps) => (
                        <Link href="/artikkel/[slug]" as={linkProps.href} passHref>
                            <LinkPanel className="lenkepanel lenkepanel--border">
                                <Undertittel className="lenkepanel__heading" tag="p">
                                    {article.title}
                                </Undertittel>
                                <span className="lenkepanel__indikator" />
                            </LinkPanel>
                        </Link>
                    )}
                >
                    <></>
                </LenkepanelBase>
            ))}
        </ArticleWrapper>
    </FrontpagePanel>
);
