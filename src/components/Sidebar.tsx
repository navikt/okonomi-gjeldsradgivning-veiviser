import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SanityArticle, SanityArticleGroup } from '../sanityDocumentTypes';
import { getArticleOffsets, getFirstIdAfterCurrentOffset } from '../utils/scrollUtils';
import { PanelIcon } from './PanelIcon';

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
