import React from 'react';
import { getAllArticlesWithSlug } from '../utils/sanity-fetch';

const generateSitemap = (pages: Page[]): string =>
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
            .map((page) => {
                return `
                    <url>
                        <loc>${`https://www.nav.no/okonomi-og-gjeld${page.path}${page.slug}`}</loc>
                    </url>
                `;
            })
            .join('')}
    </urlset>
    `;

class Sitemap extends React.Component {
    static getInitialProps = async ({ res }) => {
        const pages: Page[] = [];
        // Add index to pages
        pages.push({
            path: '',
            slug: '',
        });
        const articleSlugs = await getAllArticlesWithSlug();
        articleSlugs.forEach((slug) => {
            const page = {
                path: '/artikkel',
                slug: '/' + slug.slug,
            };
            pages.push(page);
        });

        res.setHeader('Content-Type', 'text/xml');
        res.write(generateSitemap(pages));
        res.end();
    };
}

interface Page {
    path: string;
    slug: string;
}

export default Sitemap;
