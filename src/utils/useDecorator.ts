import { Locale, setAvailableLanguages, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { Breadcrumb, Language } from '../types';

const decoratorLocales: Locale[] = ['nb', 'nn', 'en'];

export const useDecorator = (breadcrumbPage?: Breadcrumb, locales?: string[]) => {
    const { asPath, basePath, locale } = useRouter();

    const [cookie, setCookie] = useCookies(['decorator-language']);

    useEffect(() => {
        const breadcrumbs: Breadcrumb[] = [
            {
                title: 'Økonomi- og gjeldsrådgivinig',
                url: `${basePath}/${locale}`,
            },
        ];

        if (breadcrumbPage) {
            breadcrumbs.push(breadcrumbPage);
        }
        setBreadcrumbs(breadcrumbs);
    }, [breadcrumbPage, locale, basePath]);

    useEffect(() => {
        const availableLanguages: Language[] = locales?.map((language) => ({
            url: `${basePath}/${language}/${asPath}`,
            locale: decoratorLocales.includes(language as Locale) ? (language as Locale) : 'nb',
            handleInApp: false,
        }));
        setAvailableLanguages(availableLanguages ?? []);
    }, [locales, basePath, asPath]);

    useEffect(() => {
        setCookie('decorator-language', locale);
    }, [locale, cookie, setCookie]);
};
