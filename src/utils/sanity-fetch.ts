import client from "./sanity-client";

export interface ArticleType {
    title: string;
    slug: string;
    categories: string[];
    body: object[];
}

export const fetchArticleWithSlug = async (slug: string = ""): Promise<ArticleType> => {
    const query = `*[_type == "post" && slug.current == $slug][0]
    {
        title,
        "slug": slug.current,
        "categories": categories[]->title,
        body,
    }`;
    const params = {slug: slug};
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
    const query = `*[_type == "post"]
    {
        title,
        "slug": slug.current,
        "categories": categories[]->title,
    }`;
    return await client.fetch(query);
};
