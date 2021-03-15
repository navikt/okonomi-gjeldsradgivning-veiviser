import { Breadcrumb } from '@navikt/nav-dekoratoren-moduler';

import { fetchFrontpage } from './utils/sanity-fetch';

export interface StaticPathProps {
    paths: { params: { slug: string } }[];
    fallback: boolean;
}

export interface PageProps {
    appTitle: string;
    title: string;
    metaDescription: string;
    slug: string;
    breadcrumbs?: Breadcrumb;
}

export const getPageProps = async (
    title: string,
    metaDescription: string,
    slug: string,
    pageType: 'index' | 'article' | 'group'
): Promise<PageProps> => {
    const frontPage = await fetchFrontpage();
    const breadcrumbs: Breadcrumb =
        pageType === 'article' ? { title: title, url: `${process.env.NEXT_PUBLIC_APP_URL}/${pageType}/${slug}` } : null;

    return {
        appTitle: frontPage.title,
        title,
        metaDescription,
        slug,
        breadcrumbs,
    };
};
