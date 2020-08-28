import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import { cache } from './cache';

export interface DecoratorParts {
    decoratorHeader: string;
    decoratorFooter: string;
    decoratorEnv: string;
    linkTags: any[];
    scriptTags: any[];
}

const getDecoratorCached = async () => {
    return new Promise((resolve, reject) => {
        const decorator = cache.get('decorator-cache');
        if (decorator) {
            resolve(decorator);
        } else {
            fetch(process.env.DECORATOR_URL + '?feedback=false')
                .then((res) => res.text())
                .then((body) => {
                    cache.set('decorator-cache', body);
                    resolve(body);
                })
                .catch((err) => reject(err));
        }
    });
};

const objHash = (obj: any): string => {
    const str = JSON.stringify(obj);
    return createHash('md5').update(str).digest('hex');
};

export const fetchDecoratorParts = async (): Promise<DecoratorParts> => {
    const decoratorSrc = (await getDecoratorCached()) as string;

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
        decoratorEnv: $.html($('#decorator-env')),
        scriptTags: scriptTags,
        linkTags: linkTags,
    };
};
