import { groq } from 'next-sanity';

import {
    SanityArticle,
    SanityArticleGroup,
    SanityArticlePanel,
    SanityFileUpload,
    SanityFrontpage,
    SanityLinkPanel,
} from '../sanityDocumentTypes';
import client from './sanity-client';

export const articleSpec = groq`
{
    "id": _id,
    "title": coalesce(title[$locale], title.nb),
    languages,
    "slug": slug.current,
    "description": coalesce(description[$locale], description.nb),
    "metaDescription": coalesce(metaDescription[$locale], metaDescription.nb),
    "body": coalesce(body[$locale], body.nb)[]{
        ...,
        markDefs[]{
            ...,
            _type == 'internalLink' => {
                "slug": @.reference->slug,
                "type": @.reference->_type,
            },
            _type == 'fileUpload' => {
                "slug": @.reference->slug.current,
            },
        },
    },
    "iconUrl": icon.asset->url,
}`;

const articleGroupSpec = `
{
    "id": _id,
    "title": coalesce(title[$locale], title.nb),
    "articles": articles[]->
    {
        "title": coalesce(title[$locale], title.nb),
        "slug": slug.current,
        "description": coalesce(description[$locale], description.nb),
    },
}`;

const fileUploadSpec = `
{
    "assetId": file.asset->assetId,
    "extension": file.asset->extension,
    "originalFilename": file.asset->originalFilename,
    "slug": slug.current,
}
`;

export const getAllArticlesWithSlug = async (): Promise<[{ slug: string }]> => {
    const query = `*[_type == "article"]{ 'slug': slug.current }`;
    return client.fetch(query);
};

export const articleWithSlugQuery = groq`*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;

export const fetchArticleWithSlug = async (slug = '', locale: string): Promise<SanityArticle> => {
    const params = { slug: slug, locale: locale };
    return client.fetch(articleWithSlugQuery, params);
};

export const fetchArticleGroups = async (locale: string): Promise<SanityArticleGroup[]> => {
    const query = `*[_type == "articleGroup"]
    ${articleGroupSpec}`;
    const params = { locale };
    return client.fetch(query, params);
};

export const fetchArticles = async (locale = 'nb'): Promise<SanityArticle[]> => {
    const query = `*[_type == "article"]
    ${articleSpec}`;
    const params = { locale };
    return client.fetch(query, params);
};

export const fetchArticlePanels = async (locale: string): Promise<SanityArticlePanel[]> => {
    const query = `*[_type == "articlePanel"]
    {
        "id": _id,
        "title": coalesce(title[$locale], title.nb),
        "description": coalesce(description[$locale], description.nb),
        "iconUrl": icon.asset->url,
        "articles": articles[]->{
            "title": coalesce(title[$locale], title.nb),
            "slug": slug.current,
            "description": coalesce(description[$locale], description.nb),
        }
    }`;
    const params = { locale };
    return client.fetch(query, params);
};

export const fetchLinkPanels = async (locale: string): Promise<SanityLinkPanel[]> => {
    const query = `*[_type == "linkPanel"]
    {
        "id": _id,
        "title": coalesce(title[$locale], title.nb),
        "description": coalesce(description[$locale], description.nb),
        "buttonText": coalesce(buttonText[$locale], buttonText.nb),
        "iconUrl": icon.asset->url,
        "slug": article->slug.current,
    }`;
    const params = { locale };
    return client.fetch(query, params);
};

export const fetchFileWithSlug = async (slug: string | string[] = ''): Promise<SanityFileUpload> => {
    const query = `*[_type == "fileUpload" && slug.current == $slug][0]
    ${fileUploadSpec}`;
    const params = { slug: slug };
    return client.fetch(query, params);
};

export const fetchFrontpage = async (locale: string): Promise<SanityFrontpage> => {
    const query = `*[_id == "frontpage"][0]
    {
        "title": coalesce(title[$locale], title.nb),
        languages,
        "metaDescription": coalesce(metaDescription[$locale], metaDescription.nb),
        "bannerIconUrl": bannerIcon.asset->url,
    }`;
    const params = { locale };
    return client.fetch(query, params);
};
