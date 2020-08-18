export interface SanityArticle {
    title: string;
    slug: string;
    categories: string[];
    body: object[]; // Sanity content
    iconUrl: string;
}

export interface SanityArticleGroup {
    title: string;
    slug: string;
    description: object[]; // Sanity content
    articles?: SanityArticle[];
    links?: SanityLink[];
}

export interface SanityLink {
    title: string;
    href: string;
    iconUrl: string;
}

export interface SanityFrontPageArticle {
    title: string;
    categories: string[];
    slug: string;
}
