import Link from 'next/link';
import { SanityArticlePanel } from '../sanityDocumentTypes';

import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';

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
                                <div>
                                    <Undertittel tag="p">{article.title}</Undertittel>
                                </div>
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
