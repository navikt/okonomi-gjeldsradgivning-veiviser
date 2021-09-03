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
    pageType: 'index' | 'article',
    locale: string
): Promise<PageProps> => {
    const frontPage = await fetchFrontpage(locale);
    const breadcrumbs: Breadcrumb =
        pageType === 'article'
            ? { title: title, url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${pageType}/${slug}` }
            : null;

    return {
        appTitle: frontPage.title,
        title,
        metaDescription,
        slug,
        breadcrumbs,
    };
};
