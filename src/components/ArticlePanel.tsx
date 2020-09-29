import Link from 'next/link';
import { SanityArticlePanel } from '../sanityDocumentTypes';

import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

export const ArticlePanel = (props: { articlePanel: SanityArticlePanel }) => (
    <>
        <Panel className="section-panel section-panel__noIcon">
            <Innholdstittel>{props.articlePanel.title}</Innholdstittel>
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
