import {
    SanityArticle,
    SanityArticleGroup,
    SanityArticlePanel,
    SanityFileUpload,
    SanityFrontpage,
    SanityLinkPanel,
} from '../sanityDocumentTypes';
import client from './sanity-client';

const articleSpec = `
{
    "id": _id,
    "title": coalesce(title[$locale], title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description),
    "metaDescription": coalesce(metaDescription[$locale], metaDescription),
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
    "title": coalesce(title[$locale], title),
    "articles": articles[]->
    {
        "title": coalesce(title[$locale], title),
        "slug": slug.current,
        "description": coalesce(description[$locale], description),
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

export const getAllArticlesWithSlug = async (locale = 'nb'): Promise<[{ slug: string }]> => {
    const query = `*[_type == "article"]{ 'slug': slug.current }`;
    const params = { locale };
    return client.fetch(query, params);
};

export const fetchArticleWithSlug = async (slug = '', locale = 'nb'): Promise<SanityArticle> => {
    const query = `*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;
    const params = { slug: slug, locale: locale };
    return client.fetch(query, params);
};

export const fetchArticleGroups = async (locale = 'nb'): Promise<SanityArticleGroup[]> => {
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

export const fetchArticlePanels = async (locale = 'nb'): Promise<SanityArticlePanel[]> => {
    const query = `*[_type == "articlePanel"]
    {
        "id": _id,
        "title": coalesce(title[$locale], title),
        "description": coalesce(description[$locale], description),
        "iconUrl": icon.asset->url,
        "articles": articles[]->{
            "title": coalesce(title[$locale], title),
            "slug": slug.current,
            "description": coalesce(description[$locale], description),
        }
    }`;
    const params = { locale };
    return client.fetch(query, params);
};

export const fetchLinkPanels = async (locale = 'nb'): Promise<SanityLinkPanel[]> => {
    const query = `*[_type == "linkPanel"]
    {
        "id": _id,
        "title": coalesce(title[$locale], title),
        "description": coalesce(description[$locale], description),
        "buttonText": coalesce(buttonText[$locale], buttonText),
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

export const fetchFrontpage = async (locale = 'nb'): Promise<SanityFrontpage> => {
    const query = `*[_id == "frontpage"][0]
    {
        "title": coalesce(title[$locale], title),
        "metaDescription": coalesce(metaDescription[$locale], metaDescription),
        "bannerIconUrl": bannerIcon.asset->url,
    }`;
    const params = { locale };
    return client.fetch(query, params);
};
