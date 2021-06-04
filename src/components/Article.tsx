import { Title } from '@navikt/ds-react';

import { SanityArticle } from '../sanityDocumentTypes';
import { ArticlePanel } from './ArticlePanel';
import { PanelIcon } from './PanelIcon';
import { SanityBlockContent } from './SanityBlockContent';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <ArticlePanel>
            <PanelIcon imageUrl={props.article.iconUrl} />
            <Title level={1} size="xl" spacing>
                {props.article.title}
            </Title>
            <SanityBlockContent blocks={props.article.body} />
        </ArticlePanel>
    </article>
);
