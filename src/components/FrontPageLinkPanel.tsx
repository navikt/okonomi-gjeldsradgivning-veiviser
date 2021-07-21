import { BodyShort, LinkPanel, Title } from '@navikt/ds-react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledLinkPanel = styled(LinkPanel)`
    padding: 1.25rem;
    cursor: pointer;
    margin-bottom: 0;
    height: 100%;

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
                <Title level={2} size="m" spacing>
                    {article.title}
                </Title>
                <BodyShort>{article.description}</BodyShort>
            </StyledLinkPanel>
        </Link>
    );
};
