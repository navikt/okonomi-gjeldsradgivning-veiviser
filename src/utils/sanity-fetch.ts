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

export const fetchArticlePanels = async (): Promise<SanityArticlePanel[]> => {
    const query = `*[_type == "articlePanel"]
    {
        "id": _id,
        title,
        description,
        "iconUrl": icon.asset->url,
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
                    if (response && Object.keys(response).length === 0) {
                        console.log(`Spørring mot Sanity er tom. cacheKey: ${cacheKey}`);
                    }
                    cache.set(cacheKey, response);
                    resolve(response);
                })
                .catch((err) => {
                    console.error('Klarte ikke hente data fra Sanity med query', query, err);
                    reject(err);
                });
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
                    if (response && Object.keys(response).length === 0) {
                        console.log(
                            `Spørring mot Sanity er tom. cacheKey: ${cacheKey}, params: ${JSON.stringify(params)}`
                        );
                    }
                    cache.set(cacheKey, response);
                    resolve(response);
                })
                .catch((err) => {
                    console.error('Klarte ikke hente data fra Sanity med query', query, err);
                    reject(err);
                });
        }
    });
};
