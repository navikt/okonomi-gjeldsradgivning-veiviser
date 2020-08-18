export interface SanityArticle {
    title: string;
    slug: string;
    categories: string[];
    body: object[];
}

export interface SanityArticleGroup {
    title: string;
    slug: string;
    articles?: SanityArticle[];
    links?: SanityLink[];
}

export interface SanityLink {
    title: string;
    href: string;
}

export interface SanityFrontPageArticle {
    title: string;
    categories: string[];
    slug: string;
}
