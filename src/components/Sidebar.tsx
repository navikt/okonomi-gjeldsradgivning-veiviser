import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { SanityArticleGroup, SanityArticle, SanityLink } from '../sanityDocumentTypes';
import { PanelIcon } from './PanelIcon';
import { useEffect, useState } from 'react';
import { getArticleOffsets, getFirstIdAfterCurrentOffset } from '../utils/scrollUtils';

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

                {props.articleGroup.links?.map((link: SanityLink) => (
                    <Normaltekst key={link.title} className="sidebar-link__link">
                        <Lenke href={link.href}>
                            <img src={link.iconUrl} />
                            <span>{link.title}</span>
                        </Lenke>
                    </Normaltekst>
                ))}
            </Panel>
        </aside>
    );
};
