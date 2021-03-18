import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Innholdstittel } from 'nav-frontend-typografi';
import Link from 'next/link';
import styled from 'styled-components';

import { SanityLinkPanel } from '../sanityDocumentTypes';
import { SanityBlockContent } from './SanityBlockContent';

const FrontpageLinkPanel = styled.a`
    margin-bottom: 2rem;
    position: relative;
    max-width: 58.25rem;
    padding: 2rem 2rem 1rem 2rem !important;
    cursor: pointer;

    .typo-innholdstittel {
        margin-block-end: 1rem;
    }
    .typo-normal {
        margin-block-start: 0.5rem;
        margin-block-end: 0.5rem;
    }
`;

const LinkPanelImage = styled.div`
    @media screen and (max-width: 470px) {
        display: none;
    }
    background-color: #9bd0b0;
    border-radius: 50%;
    overflow: hidden;

    height: 6rem;
    width: 6rem;
    min-width: 6rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
`;

const Icon = styled.img`
    min-width: 6rem;
    width: 6rem;
    height: 6rem;
    align-self: center;
`;

export const LinkPanel = (props: { linkPanel: SanityLinkPanel }) => (
    <LenkepanelBase
        href={`/artikkel/${props.linkPanel.slug}`}
        linkCreator={(linkProps) => (
            <Link href="/artikkel/[slug]" as={linkProps.href} passHref>
                <FrontpageLinkPanel className="lenkepanel">
                    {props.linkPanel.iconUrl && (
                        <LinkPanelImage>
                            <Icon alt="" src={props.linkPanel.iconUrl} />
                        </LinkPanelImage>
                    )}

                    <div>
                        <Innholdstittel className="lenkepanel__heading">{props.linkPanel.title}</Innholdstittel>
                        <SanityBlockContent blocks={props.linkPanel.description} />
                    </div>
                    <span className="lenkepanel__indikator" />
                </FrontpageLinkPanel>
            </Link>
        )}
    >
        <></>
    </LenkepanelBase>
);
