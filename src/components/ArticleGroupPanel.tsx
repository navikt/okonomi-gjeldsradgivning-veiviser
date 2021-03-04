import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Link from 'next/link';
import styled from 'styled-components';

import { SanityArticleGroup } from '../sanityDocumentTypes';
import { FrontpagePanel } from './FrontpagePanel';

const ArticleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ArticleBoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-bottom: 1rem;

    @media screen and (min-width: 1024px) {
        width: 28.375rem;
    }

    @media screen and (max-width: 1023px) {
        width: 100%;
    }
`;

export const ArticleGroupPanel = (props: { articleGroup: SanityArticleGroup }) => (
    <FrontpagePanel>
        <Systemtittel>{props.articleGroup.title}</Systemtittel>
        <ArticleWrapper>
            {props.articleGroup.articles?.map((article) => (
                <ArticleBoxWrapper key={article.slug}>
                    <div>
                        <Link href="/artikkel/[slug]" as={`/artikkel/${article.slug}`}>
                            <a className="lenke">{article.title}</a>
                        </Link>
                        <Normaltekst>{article.description}</Normaltekst>
                    </div>
                </ArticleBoxWrapper>
            ))}
        </ArticleWrapper>
    </FrontpagePanel>
);
