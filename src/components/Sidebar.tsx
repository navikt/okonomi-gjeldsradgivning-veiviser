import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SanityArticle, SanityArticleGroup } from '../sanityDocumentTypes';
import { getArticleOffsets, getFirstIdAfterCurrentOffset } from '../utils/scrollUtils';
import { PanelIcon } from './PanelIcon';

const StyledSidebar = styled.aside`
    @media screen and (max-width: 1024px) {
        display: none;
    }

    @media screen and (min-width: 1024px) {
        margin-right: 1.5rem;
        flex-shrink: 0;
    }
`;

const SidebarPanel = styled(Panel)`
    width: 280px;
    position: sticky;
    top: calc(50% - 315px);
    margin-bottom: 4rem;
`;

const Divider = styled.div`
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 1px solid #e7e9e9;
`;

const LenkeKnapp = styled.a`
    padding: 0;
    width: 100%;
`;

const SidebarLink = styled(Normaltekst)`
    margin-top: 1rem !important;
    letter-spacing: 0.2px;
    white-space: pre-wrap;
`;

export const Sidebar = (props: { articleGroup: SanityArticleGroup }) => {
    const [currentArticle, setCurrentArticle] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const articleOffsets = getArticleOffsets(props.articleGroup.articles ?? []);
            const currentOffset = window.pageYOffset;

            if (articleOffsets) {
                const nextArticle = getFirstIdAfterCurrentOffset(currentOffset, articleOffsets);
                setCurrentArticle(nextArticle);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.articleGroup.articles]);

    return (
        <StyledSidebar>
            <SidebarPanel>
                <PanelIcon imageUrl={props.articleGroup.iconUrl} />

                <Ingress>{props.articleGroup.title}</Ingress>

                {props.articleGroup.articles?.map((article: SanityArticle) => (
                    <SidebarLink key={article.slug}>
                        <Lenke className={currentArticle === article.slug && 'lenke--active'} href={`#${article.slug}`}>
                            {article.title}
                        </Lenke>
                    </SidebarLink>
                ))}

                <Divider />

                <Link href="/artikkel/jeg-har-mote-med-en-gjeldsradgiver">
                    <LenkeKnapp className="knapp">Gjeldsrådgivning fra NAV</LenkeKnapp>
                </Link>
            </SidebarPanel>
        </StyledSidebar>
    );
};
