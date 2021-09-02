export interface SanityArticle {
    id: string;
    title: string;
    slug: string;
    description: string;
    metaDescription: string;
    body: Record<string, unknown>[]; // Sanity content
    iconUrl?: string;
}

export interface SanityArticleGroup {
    id: string;
    title: string;
    articles?: { title: string; slug: string; description: string }[];
}

export interface SanityLink {
    title: string;
    href: string;
    iconUrl: string;
}

export interface SanityFrontPageArticle {
    title: string;
    description: string;
    slug: string;
}

export interface SanityFrontpage {
    title: string;
    metaDescription: string;
    bannerIconUrl: string;
}

export interface SanityLinkPanel {
    id: string;
    title: string;
    description: Record<string, unknown>;
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

export interface SanityFileUpload {
    assetId: string;
    extension: string;
    originalFilename: string;
    slug: string;
}
