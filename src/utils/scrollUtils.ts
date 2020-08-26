import { SanityArticle } from '../sanityDocumentTypes';

export const getArticleOffsets = (articles: SanityArticle[]) => {
    return articles
        .map((article) => document.getElementById(article.slug))
        .map((node) => ({
            offset: node?.offsetTop ?? 0,
            id: node?.id ?? '',
        }));
};

export const getFirstIdAfterCurrentOffset = (offset: number, nodes: { offset: number; id: string }[]): string => {
    if (offset < 100) {
        return '';
    }
    const ids = nodes.filter((node) => offset < node.offset + 30);
    if (ids && ids.length > 0) {
        return ids.shift().id;
    }
    return '';
};
