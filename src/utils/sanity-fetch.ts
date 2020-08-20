import client from './sanity-client';
import { SanityArticle, SanityArticleGroup, SanityFrontPageArticle } from '../sanityDocumentTypes';

const articleSpec = `
{
    title,
    "slug": slug.current,
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

export const fetchArticleWithSlug = async (slug: string = ''): Promise<SanityArticle> => {
    const query = `*[_type == "article" && slug.current == $slug][0]
    ${articleSpec}`;
    const params = { slug: slug };
    return await client.fetch(query, params);
};

export const fetchArticleGroupWithSlug = async (slug: string = ''): Promise<SanityArticleGroup> => {
    const query = `*[_type == "articleGroup" && slug.current == $slug][0]
    {
        title,
        "slug": slug.current,
        "articles": articles[]-> ${articleSpec},
        "links": externalLinks[]->
        {
            title, 
            href,
            "iconUrl": icon.asset->url,
        }
    }`;
    const params = { slug: slug };
    return await client.fetch(query, params);
};

export const fetchArticlesForFrontpage = async (): Promise<SanityFrontPageArticle[]> => {
    const query = `*[_type == "article"]
    {
        title,
        "slug": slug.current,
        "categories": categories[]->title,
    }`;
    return client.fetch(query);
};
