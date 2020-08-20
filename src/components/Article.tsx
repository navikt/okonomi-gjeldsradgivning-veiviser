import { SanityArticle } from '../sanityDocumentTypes';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { SanityBlockContent } from './SanityBlockContent';
import { PanelIcon } from './PanelIcon';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <Panel
            className={`section-panel ${props.article.iconUrl ? 'section-panel__withIcon' : 'section-panel__noIcon'}`}
        >
            <PanelIcon imageUrl={props.article.iconUrl} />
            <Innholdstittel id={props.article.slug}>{props.article.title}</Innholdstittel>
            <SanityBlockContent blocks={props.article.body} />
        </Panel>
    </article>
);
