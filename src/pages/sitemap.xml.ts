import { getAllArticlesWithSlug } from '../utils/sanity-fetch';

const Sitemap = (props: { pages: Page[] }) =>
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${props.pages
            .map((page) => {
                return `
                    <url>
                        <loc>${`https://nav.no/okonomi-og-gjeld${page.path}/${page.slug}`}</loc>
                    </url>
                `;
            })
            .join('')}
    </urlset>
    `;

interface StaticProps {
    props: {
        pages: Page[];
    };
    revalidate: number;
}

interface Page {
    path: string;
    slug: string;
}

export const getStaticProps = async (): Promise<StaticProps> => {
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
            slug: slug.slug,
        };
        pages.push(page);
    });

    return {
        props: { pages },
        revalidate: 60,
    };
};

export default Sitemap;
