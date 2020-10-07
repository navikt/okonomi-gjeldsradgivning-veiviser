export type SanityDocumentType =
    | 'article'
    | 'articleGroup'
    | 'linkPanel'
    | 'articlePanel'
    | 'externalLink'
    | 'frontpage';

export interface SanityArticle {
    id: string;
    title: string;
    slug: string;
    description: string;
    metaDescription: string;
    categories: string[];
    body: object[]; // Sanity content
    iconUrl?: string;
}

export interface SanityArticleGroup {
    id: string;
    type: SanityDocumentType;
    title: string;
    slug: string;
    description: object[]; // Sanity content
    metaDescription: string;
    articles?: SanityArticle[];
    links?: SanityLink[];
    iconUrl: string;
}

export interface SanityLink {
    title: string;
    href: string;
    iconUrl: string;
}

export interface SanityFrontPageArticle {
    title: string;
    description: string;
    categories: string[];
    slug: string;
}

export interface SanityFrontpage {
    title: string;
    metaDescription: string;
    bannerIconUrl: string;
    panels: SanityPanel[];
}

export interface SanityFrontPageArticleGroup {
    id: string;
    title: string;
    slug: string;
    description?: string; // Sanity content
    articles: [
        {
            title: string;
            slug: string;
            description: string;
            iconUrl: string;
        }
    ];
}

export interface SanityLinkPanel {
    id: string;
    type: SanityDocumentType;
    title: string;
    description: object;
    slug: string;
    iconUrl?: string;
}

export interface SanityArticlePanel {
    id: string;
    title: string;
    description?: string; // Sanity content
    iconUrl?: string;
    articles: [
        {
            title: string;
            slug: string;
            description: string;
        }
    ];
}

export interface SanityPanel {
    _id: string;
    _type: SanityDocumentType;
}
