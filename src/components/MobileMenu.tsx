import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SanityArticle, SanityArticleGroup } from '../sanityDocumentTypes';
import { getArticleOffsets, getFirstIdAfterCurrentOffset } from '../utils/scrollUtils';

const StyledMobileMenu = styled.nav`
    .panel {
        border-radius: 0;
    }

    @media screen and (max-width: 1024px) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    }

    @media screen and (min-width: 1024px) {
        display: none;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Divider = styled.div`
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e7e9e9;
`;

const MenuLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const MenuButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const MenuLink = styled(Normaltekst)`
    white-space: nowrap;
    text-overflow: ellipsis;

    width: 250px;

    overflow: hidden;
    margin: 0.5rem 0;
`;

const OpenMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
`;

export const MobileMenu = (props: { articleGroup: SanityArticleGroup }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState('');
    const [articleTitle, setArticleTitle] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const articleOffsets = getArticleOffsets(props.articleGroup.articles ?? []);
            const currentOffset = window.pageYOffset;

            if (articleOffsets) {
                const nextArticle = getFirstIdAfterCurrentOffset(currentOffset, articleOffsets);
                const articleTitles = props.articleGroup.articles?.filter((article) => article.slug === nextArticle);
                setCurrentArticle(nextArticle);
                setArticleTitle(articleTitles && articleTitles.length > 0 ? articleTitles.shift().title : '');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.articleGroup.articles]);

    return (
        <StyledMobileMenu>
            <Panel>
                <Header onClick={() => setIsOpen(!isOpen)}>
                    <img src={props.articleGroup.iconUrl} />
                    <Element>{articleTitle}</Element>
                    <NavFrontendChevron type={isOpen ? 'opp' : 'ned'} />
                </Header>
                {isOpen && (
                    <OpenMenu>
                        <MenuLinks>
                            {props.articleGroup.articles?.map((article: SanityArticle) => (
                                <MenuLink key={article.slug}>
                                    <Lenke
                                        className={currentArticle === article.slug && 'lenke--active'}
                                        href={`#${article.slug}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {article.title}
                                    </Lenke>
                                </MenuLink>
                            ))}
                        </MenuLinks>

                        <Divider />

                        <MenuButtons>
                            <Link href="/artikkel/jeg-har-mote-med-en-gjeldsradgiver">
                                <a className="knapp">Gjeldsrådgivning fra NAV</a>
                            </Link>
                        </MenuButtons>
                    </OpenMenu>
                )}
            </Panel>
        </StyledMobileMenu>
    );
};
