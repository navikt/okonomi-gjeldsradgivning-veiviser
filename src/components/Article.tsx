import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';

import { SanityArticle } from '../sanityDocumentTypes';
import { PanelIcon } from './PanelIcon';
import { SanityBlockContent } from './SanityBlockContent';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <Panel
            id={props.article.slug}
            className={`section-panel section-panel__article ${
                props.article.iconUrl ? 'section-panel__withIcon' : 'section-panel__noIcon'
            }`}
        >
            <PanelIcon imageUrl={props.article.iconUrl} />
            <Innholdstittel>{props.article.title}</Innholdstittel>
            <SanityBlockContent blocks={props.article.body} />
        </Panel>
    </article>
);
