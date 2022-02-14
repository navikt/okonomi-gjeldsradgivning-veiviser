import { Heading, Panel } from '@navikt/ds-react';
import styled from 'styled-components';

import { SanityArticle } from '../sanityDocumentTypes';
import { ArticlePanel } from './ArticlePanel';
import { PanelIcon } from './PanelIcon';
import { SanityBlockContent } from './SanityBlockContent';

export const Article = (props: { article: SanityArticle }) => (
    <article>
        <ArticlePanel>
            <PanelIcon imageUrl={props.article.iconUrl} />
            <Heading level="1" size="xlarge" spacing>
                {props.article.title}
            </Heading>
            <SanityBlockContent blocks={props.article.body} />
        </ArticlePanel>
    </article>
);
