import { Innholdstittel } from 'nav-frontend-typografi';

import { SanityArticle } from '../sanityDocumentTypes';
import { ArticlePanel } from './ArticlePanel';
import { PanelIcon } from './PanelIcon';
import { SanityBlockContent } from './SanityBlockContent';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <ArticlePanel>
            <PanelIcon imageUrl={props.article.iconUrl} />
            <Innholdstittel>{props.article.title}</Innholdstittel>
            <SanityBlockContent blocks={props.article.body} />
        </ArticlePanel>
    </article>
);
