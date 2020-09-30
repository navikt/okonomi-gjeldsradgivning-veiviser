import Link from 'next/link';
import { SanityArticlePanel } from '../sanityDocumentTypes';

import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { PanelIcon } from './PanelIcon';
import { SanityBlockContent } from './SanityBlockContent';

export const ArticlePanel = (props: { articlePanel: SanityArticlePanel }) => (
    <>
        <Panel
            className={`section-panel ${
                props.articlePanel.iconUrl ? 'section-panel__withIcon' : 'section-panel__noIcon'
            }`}
        >
            <PanelIcon imageUrl={props.articlePanel.iconUrl} />
            <Innholdstittel>{props.articlePanel.title}</Innholdstittel>
            {props.articlePanel.description && <SanityBlockContent blocks={props.articlePanel.description} />}
            <div className="section-article__wrapper">
                {props.articlePanel.articles.map((article) => (
                    <div
                        key={article.slug}
                        className="section-article__article-box section-article__article-box-wrapper"
                    >
                        <div>
                            <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                                <a className="lenke">{article.title}</a>
                            </Link>
                            <Normaltekst>{article.description}</Normaltekst>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    </>
);
