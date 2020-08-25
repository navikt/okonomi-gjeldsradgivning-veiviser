import client from './sanity-client';
import {
    SanityArticle,
    SanityArticleGroup,
    SanityFrontPageArticle,
    SanityFrontPageArticleGroup,
} from '../sanityDocumentTypes';
import { cache } from './cache';

const articleSpec = `
{
    title,
    "slug": slug.current,
    description,
    "categories": categories[]->title,
    body[]{
        ...,
        markDefs[]{
            ...,
            _type == 'internalLink' => {
                "slug": @.reference->slug,
                "type": @.reference->_type,
            },
        },
    },
    "iconUrl": icon.asset->url,
}`;

const articleGroupSpec = `
{
    title,
    "slug": slug.current,
    "articles": articles[]-> ${articleSpec},
    "iconUrl": icon.asset->url,
    "links": externalLinks[]->
    {
        title, 
        href,
        "iconUrl": icon.asset->url,
    }
}`;

export const fetchArticleWithSlug = async (slug: string = ''): Promise<SanityArticle> => {
    const query = `*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;
    const params = { slug: slug };
    return fetchQueryAndParamWithCache(query, params, `article-${slug}`);
};

export const fetchArticleGroupsForFrontpage = async (): Promise<SanityFrontPageArticleGroup[]> => {
    const query = `*[_type == "articleGroup"]
    {
        title,
        "slug": slug.current,
        description,
        "articles": articles[]-> {
            title,
            "slug": slug.current,
            description,
            "iconUrl": icon.asset->url
        }
    }`;
    return fetchQueryWithCache(query, 'frontpage-article-group');
};

export const fetchArticleGroupWithSlug = async (slug: string = ''): Promise<SanityArticleGroup> => {
    const query = `*[_type == "articleGroup" && slug.current == $slug][0]
    ${articleGroupSpec}`;
    const params = { slug: slug };
    return fetchQueryAndParamWithCache(query, params, `article-group-${slug}`);
};

export const fetchArticlesForFrontpage = async (): Promise<SanityFrontPageArticle[]> => {
    const query = `*[_type == "article"]
    {
        title,
        description,
        "slug": slug.current,
        "categories": categories[]->title,
    }`;
    return fetchQueryWithCache(query, 'frontpage-article');
};

const fetchQueryWithCache = async (query: string, cacheKey: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse) {
            resolve(cachedResponse);
        } else {
            client
                .fetch(query)
                .then((response) => {
                    cache.set(cacheKey, response);
                    resolve(response);
                })
                .catch((err) => reject(err));
        }
    });
};

const fetchQueryAndParamWithCache = async (query: string, params: {}, cacheKey: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse) {
            resolve(cachedResponse);
        } else {
            client
                .fetch(query, params)
                .then((response) => {
                    cache.set(cacheKey, response);
                    resolve(response);
                })
                .catch((err) => reject(err));
        }
    });
};
