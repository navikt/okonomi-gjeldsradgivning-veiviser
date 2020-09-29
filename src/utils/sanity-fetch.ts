import client from './sanity-client';
import {
    SanityArticle,
    SanityArticleGroup,
    SanityLinkPanel,
    SanityFrontpage,
    SanityArticlePanel,
} from '../sanityDocumentTypes';
import { cache } from './cache';

const articleSpec = `
{
    "id": _id,
    title,
    "slug": slug.current,
    description,
    metaDescription,
    "categories": categories[]->title,
    body[]{
        ...,
        markDefs[]{
            ...,
            _type == 'internalLink' => {
                "slug": @.reference->slug,
                "type": @.reference->_type,
            },
            _type == 'fileUpload' => {
                "assetId": @.reference->file.asset->assetId,
                "extension": @.reference->file.asset->extension,
                "originalFilename": @.reference->file.asset->originalFilename,
            },
        },
    },
    "iconUrl": icon.asset->url,
}`;

const articleGroupSpec = `
{
    "id": _id,
    title,
    "slug": slug.current,
    description,
    metaDescription,
    "articles": articles[]-> ${articleSpec},
    "iconUrl": icon.asset->url,
    "links": externalLinks[]->
    {
        title, 
        href,
        "iconUrl": icon.asset->url,
    }
}`;

export const getAllArticlesWithSlug = async (): Promise<[{ slug: string }]> => {
    return await client.fetch(`*[_type == "article"]{ 'slug': slug.current }`);
};

export const getAllArticleGroupsWithSlug = async (): Promise<[{ slug: string }]> => {
    return await client.fetch(`*[_type == "articleGroup"]{ 'slug': slug.current }`);
};

export const fetchArticleWithSlug = async (slug: string = ''): Promise<SanityArticle> => {
    const query = `*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;
    const params = { slug: slug };
    return fetchQueryAndParamWithCache(query, params, `article-${slug}`);
};

export const fetchArticleGroups = async (): Promise<SanityArticleGroup[]> => {
    const query = `*[_type == "articleGroup"]
    ${articleGroupSpec}`;
    return fetchQueryWithCache(query, 'sanity-article-groups');
};

export const fetchArticleGroupWithSlug = async (slug: string = ''): Promise<SanityArticleGroup> => {
    const query = `*[_type == "articleGroup" && slug.current == $slug][0]
    ${articleGroupSpec}`;
    const params = { slug: slug };
    return fetchQueryAndParamWithCache(query, params, `article-group-${slug}`);
};

export const fetchArticles = async (): Promise<SanityArticle[]> => {
    const query = `*[_type == "article"]
    ${articleSpec}`;
    return fetchQueryWithCache(query, 'sanity-articles');
};

export const fetchLinkPanels = async (): Promise<SanityLinkPanel[]> => {
    const query = `*[_type == "linkPanel"]
    {
        "id": _id,
        title,
        description,
        "slug": article->slug.current,
        "type": article->_type,
        "iconUrl": icon.asset->url,
    }`;
    return fetchQueryWithCache(query, 'sanity-link-panels');
};

export const fetchArticlePanels = async (): Promise<SanityArticlePanel[]> => {
    const query = `*[_type == "articlePanel"]
    {
        "id": _id,
        title,
        "articles": articles[]->{
            title,
            "slug": slug.current,
            description
        }
    }`;
    return fetchQueryWithCache(query, 'sanity-article-panels');
};

export const fetchFrontpage = async (): Promise<SanityFrontpage> => {
    const query = `*[_id == "frontpage"][0]
    {
        title,
        metaDescription,
        "bannerIconUrl": bannerIcon.asset->url,
        "panels": panels[]->{
            _type,
            _id,
        },
    }`;
    return fetchQueryWithCache(query, 'sanity-frontpage');
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
