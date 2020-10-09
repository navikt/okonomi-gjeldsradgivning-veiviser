import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { SanityArticleGroup, SanityArticle } from '../sanityDocumentTypes';
import { PanelIcon } from './PanelIcon';
import { useEffect, useState } from 'react';
import { getArticleOffsets, getFirstIdAfterCurrentOffset } from '../utils/scrollUtils';
import Link from 'next/link';

export const Sidebar = (props: { articleGroup: SanityArticleGroup }) => {
    const [currentArticle, setCurrentArticle] = useState('');

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
            setCurrentArticle(nextArticle);
        }
    };

    return (
        <aside className="sidebar">
            <Panel className="sidebar-panel">
                <PanelIcon imageUrl={props.articleGroup.iconUrl} />

                <Ingress>{props.articleGroup.title}</Ingress>

                {props.articleGroup.articles?.map((article: SanityArticle) => (
                    <Normaltekst key={article.slug} className="sidebar-link__link">
                        <Lenke className={currentArticle === article.slug && 'lenke--active'} href={`#${article.slug}`}>
                            {article.title}
                        </Lenke>
                    </Normaltekst>
                ))}

                <div className="divider" />

                <Link href="/artikkel/jeg-har-mote-med-en-gjeldsradgiver">
                    <a className="knapp">Gjeldsrådgivning fra NAV</a>
                </Link>
            </Panel>
        </aside>
    );
};
