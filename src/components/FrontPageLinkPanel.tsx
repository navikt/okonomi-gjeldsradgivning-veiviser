import { LinkPanel } from '@navikt/ds-react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledLinkPanel = styled(LinkPanel)`
    padding: 1.25rem;
    cursor: pointer;
    margin-bottom: 0;
    height: calc(100% - 2.5rem);

    .navds-link-panel__content {
        align-self: start;
    }

    .typo-systemtittel {
        margin-bottom: 0.75rem;
    }
`;

export const FrontPageLinkPanel = (article: { title: string; slug: string; description: string }) => {
    return (
        <Link href="/artikkel/[slug]" as={`/artikkel/${article.slug}`} passHref>
            <StyledLinkPanel href="#" border={false}>
                <Systemtittel tag="p">{article.title}</Systemtittel>
                <Normaltekst>{article.description}</Normaltekst>
            </StyledLinkPanel>
        </Link>
    );
};
