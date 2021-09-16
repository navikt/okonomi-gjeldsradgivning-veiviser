import { LinkPanel } from '@navikt/ds-react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledLinkPanel = styled(LinkPanel)`
    padding: 1.25rem;
    height: 100%;

    .navds-link-panel__content {
        align-self: start;
    }
`;

export const FrontPageLinkPanel = (article: { title: string; slug: string; description: string }) => {
    return (
        <Link href="/artikkel/[slug]" as={`/artikkel/${article.slug}`} passHref>
            <StyledLinkPanel href="#" border={false}>
                <LinkPanel.Title>{article.title}</LinkPanel.Title>
                <LinkPanel.Description>{article.description}</LinkPanel.Description>
            </StyledLinkPanel>
        </Link>
    );
};
