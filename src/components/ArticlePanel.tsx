import { SanityArticlePanel, SanityPanel, SanityArticle } from '../sanityDocumentTypes';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Link from 'next/link';

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
