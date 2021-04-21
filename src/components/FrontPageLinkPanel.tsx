import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const StyledFrontPageLinkPanel = styled.div`
    align-self: start;
`;

const LinkPanel = styled.a`
    padding: 1.25rem;
    cursor: pointer;
    margin-bottom: 0;
    height: calc(100% - 2.5rem);

    .typo-systemtittel {
        margin-bottom: 0.75rem;
    }
`;

export const FrontPageLinkPanel = (article: { title: string; slug: string; description: string }) => {
    return (
        <LenkepanelBase
            key={article.slug}
            href={`/artikkel/${article.slug}`}
            linkCreator={(linkProps) => (
                <Link href="/artikkel/[slug]" as={linkProps.href} passHref>
                    <LinkPanel className="lenkepanel">
                        <StyledFrontPageLinkPanel>
                            <Systemtittel className="lenkepanel__heading" tag="p">
                                {article.title}
                            </Systemtittel>
                            <Normaltekst>{article.description}</Normaltekst>
                        </StyledFrontPageLinkPanel>
                        <span className="lenkepanel__indikator" />
                    </LinkPanel>
                </Link>
            )}
        >
            <></>
        </LenkepanelBase>
    );
};
