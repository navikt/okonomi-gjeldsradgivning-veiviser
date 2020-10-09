import { SanityArticleGroup, SanityLink, SanityArticle } from '../sanityDocumentTypes';
import { useState, useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';

import { getArticleOffsets, getFirstIdAfterCurrentOffset } from '../utils/scrollUtils';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import Link from 'next/link';

export const MobileMenu = (props: { articleGroup: SanityArticleGroup }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState('');
    const [articleTitle, setArticleTitle] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    return (
        <nav className="mobile-menu">
            <Panel>
                <div className="mobile-menu__header" onClick={() => setIsOpen(!isOpen)}>
                    <img className="mobile-menu-header__icon" src={props.articleGroup.iconUrl} />
                    <Element>{articleTitle}</Element>
                    <NavFrontendChevron type={isOpen ? 'opp' : 'ned'} />
                </div>
                <div className={`mobile-menu-content ${isOpen && 'mobile-menu-content__open'}`}>
                    <div className="mobile-menu-content__links">
                        {props.articleGroup.articles?.map((article: SanityArticle) => (
                            <Normaltekst key={article.slug} className="mobile-menu-content__link">
                                <Lenke
                                    className={currentArticle === article.slug && 'lenke--active'}
                                    href={`#${article.slug}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {article.title}
                                </Lenke>
                            </Normaltekst>
                        ))}
                    </div>

                    <div className="divider" />

                    <div className="mobile-menu-content__buttons">
                        <Link href="/artikkel/jeg-har-mote-med-en-gjeldsradgiver">
                            <a className="knapp">Gjeldsrådgivning fra NAV</a>
                        </Link>
                    </div>
                </div>
            </Panel>
        </nav>
    );
};
