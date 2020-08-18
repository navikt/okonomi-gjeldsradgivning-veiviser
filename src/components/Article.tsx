import { SanityArticle } from '../sanityDocumentTypes';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { SanityBlockContent } from './SanityBlockContent';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <Panel className="seksjon-panel">
            <ArticleIcon iconUrl={props.article.iconUrl} />
            <Innholdstittel id={props.article.slug}>{props.article.title}</Innholdstittel>
            <SanityBlockContent blocks={props.article.body} />
        </Panel>
    </article>
);

const ArticleIcon = (props: { iconUrl?: string }) => (
    <>
        {props.iconUrl && (
            <div className="seksjon-ikon">
                <img src={props.iconUrl} />
            </div>
        )}
    </>
);
