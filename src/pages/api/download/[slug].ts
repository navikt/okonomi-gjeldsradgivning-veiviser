import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { cache } from '../../../utils/cache';
import sanityConfig from '../../../../sanity/sanity.json';
import { fetchFileWithSlug } from '../../../utils/sanity-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    const { referer } = req.headers;

    console.log(`Spørring etter fil med slug ${slug} fra Sanity. Referer er ${referer}`);

    const file = await cache.get(`download-${slug}`);

    // @ts-ignore
    const fileUpload = await fetchFileWithSlug(slug);

    if (file) {
        res.setHeader('Content-Disposition', `attachment; filename="${fileUpload.originalFilename}"`);
        res.send(file);
    } else {
        await fetch(
            `https://cdn.sanity.io/files/${sanityConfig.api.projectId}/${sanityConfig.api.dataset}/${fileUpload.assetId}.${fileUpload.extension}?dl=`
        )
            .then((fetchResponse) => {
                if (fetchResponse.ok) {
                    return fetchResponse.buffer();
                } else {
                    throw new Error(`File not found, slug: ${slug}`);
                }
            })
            .then((buffer) => {
                cache.set(`download-${slug}`, buffer);
                res.setHeader('Content-Disposition', `attachment; filename="${fileUpload.originalFilename}"`);
                res.send(buffer);
            })
            .catch((e) => {
                console.warn(e);
                res.redirect('/okonomi-og-gjeld/filen-finnes-ikke');
            });
    }
}
