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

export interface SanityFrontPageArticleGroup {
    title: string;
    slug: string;
    description: object; // Sanity content
    articles: [
        {
            title: string;
            slug: string;
            description: string;
            iconUrl: string;
        }
    ];
}
