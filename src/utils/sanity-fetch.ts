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
                "slug": @.reference->slug.current,
            },
        },
    },
    "iconUrl": icon.asset->url,
}`;

const articleGroupSpec = `
{
    "id": _id,
    title,
    "articles": articles[]->
    {
        title,
        "slug": slug.current,
        description
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

export const fetchArticleWithSlug = async (slug = ''): Promise<SanityArticle> => {
    const query = `*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;
    const params = { slug: slug };
    return client.fetch(query, params);
};

export const fetchArticleGroups = async (): Promise<SanityArticleGroup[]> => {
    const query = `*[_type == "articleGroup"]
    ${articleGroupSpec}`;
    return client.fetch(query);
};

export const fetchArticles = async (): Promise<SanityArticle[]> => {
    const query = `*[_type == "article"]
    ${articleSpec}`;
    return client.fetch(query);
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
    return client.fetch(query);
};

export const fetchLinkPanels = async (): Promise<SanityLinkPanel[]> => {
    const query = `*[_type == "linkPanel"]
    {
        "id": _id,
        title,
        description,
        buttonText,
        "iconUrl": icon.asset->url,
        "slug": article->slug.current,
    }`;
    return client.fetch(query);
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
        title,
        metaDescription,
        "bannerIconUrl": bannerIcon.asset->url,
        useLocalizedFrontpagePanels,
        "frontpagePanels": frontpagePanels[]{
            "id": _key,
            withTitle,
            "title": coalesce(title[$locale], title.nb),
            columnLayout,
            "articles": articles[]->{
                title,
                "slug": slug.current,
                description
            }
        },
    }`;
    const params = { locale };
    return client.fetch(query, params);
};
