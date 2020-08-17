import client from './sanity-client';

export interface ArticleType {
    title: string;
    slug: string;
    categories: string[];
    body: object[];
}

const articleSpec = `
{
    title,
    "slug": slug.current,
    "categories": categories[]->title,
    body,
}`;

export const fetchArticleWithSlug = async (slug: string = ''): Promise<ArticleType> => {
    const query = `*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;
    const params = { slug: slug };
    return await client.fetch(query, params);
};

export interface ArticleGroupType {
    title: string;
    slug: string;
    articles: ArticleType[];
    links: [
        {
            title: string;
            href: string;
        }
    ];
}

export const fetchArticleGroupWithSlug = async (slug: string = ''): Promise<ArticleGroupType> => {
    const query = `*[_type == "articleGroup" && slug.current == $slug][0]
    {
        title,
        "slug": slug.current,
        "articles": articles[]-> ${articleSpec},
        "links": externalLinks[]->
        {
            title, href
        }
    }`;
    const params = { slug: slug };
    return await client.fetch(query, params);
};

export interface FrontPageArticleType {
    [key: string]: {
        title: string;
        categories: string[];
        slug: string;
    };
}

export const fetchArticlesForFrontpage = async (): Promise<FrontPageArticleType> => {
    const query = `*[_type == "article"]
    {
        title,
        "slug": slug.current,
        "categories": categories[]->title,
    }`;
    return await client.fetch(query);
};
