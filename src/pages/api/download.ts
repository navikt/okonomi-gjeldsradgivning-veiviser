import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { cache } from '../../utils/cache';
import sanityConfig from '../../../sanity/sanity.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const file = await cache.get(`download-${req.query['name']}`);
    if (file) {
        res.setHeader('Content-Disposition', `attachment; filename="${req.query['name']}"`);
        res.send(file);
    } else {
        await fetch(
            `https://cdn.sanity.io/files/${sanityConfig.api.projectId}/${sanityConfig.api.dataset}/${req.query['file']}?dl=`
        )
            .then((response) => {
                if (response.ok) {
                    return response.buffer();
                } else {
                    throw new Error(`File not found, filename: ${req.query['name']}`);
                }
            })
            .then((buffer) => {
                cache.set(`download-${req.query['name']}`, buffer);
                res.setHeader('Content-Disposition', `attachment; filename="${req.query['name']}"`);
                res.send(buffer);
            })
            .catch((e) => {
                console.warn(e);
                res.redirect('/okonomi-og-gjeld/filen-finnes-ikke');
            });
    }
}
