import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Link from 'next/link';
import React from 'react';

import { SanityArticlePanel } from '../sanityDocumentTypes';

export const ArticlePanel = (props: { articlePanel: SanityArticlePanel }) => (
    <Panel className={`section-panel section-panel__frontpage situation-panel`}>
        <div className="header-wrapper">
            <Systemtittel>{props.articlePanel.title}</Systemtittel>
            <div className="divider" />
        </div>
        <div className="section-article__wrapper">
            {props.articlePanel.articles.map((article) => (
                <LenkepanelBase
                    key={article.slug}
                    href={`/artikkel/${article.slug}`}
                    linkCreator={(linkProps) => (
                        <Link href="/artikkel/[slug]" as={linkProps.href}>
                            <a
                                className="lenkepanel lenkepanel--border situation-panel__link-panel"
                                style={{ cursor: 'pointer' }}
                            >
                                <Undertittel className="lenkepanel__heading" tag="p">
                                    {article.title}
                                </Undertittel>
                                <span className="lenkepanel__indikator" />
                            </a>
                        </Link>
                    )}
                >
                    <></>
                </LenkepanelBase>
            ))}
        </div>
    </Panel>
);
