import { SanityArticleGroup } from '../sanityDocumentTypes';

import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Link from 'next/link';

export const ArticleGroupPanel = (props: { articleGroup: SanityArticleGroup }) => (
    <Panel className="section-panel section-panel__frontpage">
        <Systemtittel>{props.articleGroup.title}</Systemtittel>
        <Ingress>{props.articleGroup.description}</Ingress>
        <div className="section-article__wrapper">
            {props.articleGroup.articles?.map((article) => (
                <div key={article.slug} className="section-article__article-box section-article__article-box-wrapper">
                    <div>
                        <Link href="group/[slug]" as={`group/${props.articleGroup.slug}#${article.slug}`}>
                            <a className="lenke">{article.title}</a>
                        </Link>
                        <Normaltekst>{article.description}</Normaltekst>
                    </div>
                </div>
            ))}
        </div>
    </Panel>
);
