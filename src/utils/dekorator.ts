import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import { cache } from './cache';

export interface DecoratorParts {
    decoratorHeader: string;
    decoratorFooter: string;
    decoratorEnv: { dataSrc: string; scriptUrl: string };
    linkTags: any[];
    scriptTags: any[];
}

export interface DecoratorParams {
    siteTitle: string;
    cacheKey: string;
    breadcrumbs: {
        title: string;
        url: string;
    }[];
}

const getDecoratorCached = async (decoratorParams: DecoratorParams) => {
    return new Promise((resolve, reject) => {
        const decorator = cache.get(`decorator-cache-${decoratorParams.cacheKey}`);
        if (decorator) {
            resolve(decorator);
        } else {
            const queryParams = {
                feedback: false,
                breadcrumbs: [
                    {
                        title: 'Økonomi- og gjeldsrådgivinig',
                        url: process.env.APP_URL,
                    },
                ].concat(decoratorParams.breadcrumbs),
            };
            const queryString = Object.keys(queryParams)
                .map((key: string) => {
                    return key + '=' + JSON.stringify(queryParams[key]);
                })
                .join('&');
            const url = process.env.DECORATOR_URL + '?' + queryString;
            fetch(url)
                .then((res) => res.text())
                .then((body) => {
                    cache.set('decorator-cache', body);
                    resolve(body);
                })
                .catch((err) => {
                    console.error('Failed to fetch decorator with params', url, decoratorParams);
                    reject(err);
                });
        }
    });
};

const objHash = (obj: any): string => {
    const str = JSON.stringify(obj);
    return createHash('md5').update(str).digest('hex');
};

export const fetchDecoratorParts = async (decoratorParams: DecoratorParams): Promise<DecoratorParts> => {
    const decoratorSrc = (await getDecoratorCached(decoratorParams)) as string;

    const $ = cheerio.load(decoratorSrc);
    const scriptTags = [];

    $('#scripts script').each((index, element) => {
        element.attribs.key = objHash(element.attribs);
        scriptTags.push({ ...element.attribs });
    });
    $('#megamenu-resources script').each((index, element) => {
        element.attribs.key = objHash(element.attribs);
        scriptTags.push({ ...element.attribs });
    });
    const linkTags = [];
    $('#styles link').each((index, element) => {
        element.attribs.key = objHash(element.attribs);
        linkTags.push({ ...element.attribs });
    });
    $('#megamenu-resources link').each((index, element) => {
        element.attribs.key = objHash(element.attribs);
        linkTags.push({ ...element.attribs });
    });
    scriptTags.map((attrib) => {
        if (attrib.id === 'google-tag-manager-props') {
            attrib.defer = true;
            attrib.async = true;
        }
        if (attrib.src.indexOf('app.min.js')) {
            attrib.defer = true;
        }
    });

    return {
        decoratorHeader: $.html($('#decorator-header')),
        decoratorFooter: $.html($('#decorator-footer')),
        decoratorEnv: {
            dataSrc: $('#decorator-env').attr('data-src'),
            scriptUrl: $('#scripts script').attr('src'),
        },
        scriptTags: scriptTags,
        linkTags: linkTags,
    };
};
