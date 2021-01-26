import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import sanityConfig from '../../../sanity/sanity.json';
import { cache } from '../../utils/cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(
        `Spørring etter fil med id ${req.query['id']} og filnavn ${req.query['dl']} fra Sanity. Referer er ${req.headers.referer}`
    );
    const file = await cache.get(`download-${req.query['id']}`);
    if (file) {
        res.setHeader('Content-Disposition', `attachment; filename="${req.query['dl']}"`);
        res.send(file);
    } else {
        await fetch(
            `https://cdn.sanity.io/files/${sanityConfig.api.projectId}/${sanityConfig.api.dataset}/${req.query['id']}?dl=`
        )
            .then((response) => {
                if (response.ok) {
                    return response.buffer();
                } else {
                    throw new Error(`File not found, filename: ${req.query['dl']}`);
                }
            })
            .then((buffer) => {
                cache.set(`download-${req.query['id']}`, buffer);
                res.setHeader('Content-Disposition', `attachment; filename="${req.query['dl']}"`);
                res.send(buffer);
            })
            .catch((e) => {
                console.warn(e);
                res.redirect('/okonomi-og-gjeld/filen-finnes-ikke');
            });
    }
}
