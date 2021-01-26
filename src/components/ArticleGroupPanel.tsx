import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Link from 'next/link';

import { SanityArticleGroup } from '../sanityDocumentTypes';

export const ArticleGroupPanel = (props: { articleGroup: SanityArticleGroup }) => (
    <Panel className="section-panel section-panel__frontpage">
        <Systemtittel>{props.articleGroup.title}</Systemtittel>
        <Ingress>{props.articleGroup.description}</Ingress>
        <div className="section-article__wrapper">
            {props.articleGroup.articles?.map((article) => (
                <div key={article.slug} className="section-article__article-box section-article__article-box-wrapper">
                    <div>
                        <Link href="/artikkel/[slug]" as={`/artikkel/${article.slug}`}>
                            <a className="lenke">{article.title}</a>
                        </Link>
                        <Normaltekst>{article.description}</Normaltekst>
                    </div>
                </div>
            ))}
        </div>
    </Panel>
);
