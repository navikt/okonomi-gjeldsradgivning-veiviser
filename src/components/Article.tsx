import { Heading } from '@navikt/ds-react';

import { SanityArticle } from '../sanityDocumentTypes';
import { ArticlePanel } from './ArticlePanel';
import { PanelIcon } from './PanelIcon';
import { SanityBlockContent } from './SanityBlockContent';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <ArticlePanel>
            <PanelIcon imageUrl={props.article.iconUrl} />
            <Heading level="1" size="2xlarge" spacing>
                {props.article.title}
            </Heading>
            <SanityBlockContent blocks={props.article.body} />
        </ArticlePanel>
    </article>
);
