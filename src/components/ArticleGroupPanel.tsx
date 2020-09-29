import { SanityArticleGroup } from '../sanityDocumentTypes';

import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { SanityBlockContent } from './SanityBlockContent';
import Link from 'next/link';

export const ArticleGroupPanel = (props: { articleGroup: SanityArticleGroup }) => (
    <Panel className="section-panel section-panel__noIcon">
        <Innholdstittel>{props.articleGroup.title}</Innholdstittel>
        <SanityBlockContent blocks={props.articleGroup.description} />
        <div className="section-article__wrapper">
            {props.articleGroup.articles?.map((article) => (
                <div key={article.slug} className="section-article__article-box section-article__article-box-wrapper">
                    <img alt="" className="section-article__icon" src={article.iconUrl} />
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
