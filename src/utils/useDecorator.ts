import { Breadcrumb, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';

export const useDecorator = (breadcrumbPage?: Breadcrumb) => {
    useEffect(() => {
        const breadcrumbs: Breadcrumb[] = [
            {
                title: 'Økonomi- og gjeldsrådgivinig',
                url: process.env.NEXT_PUBLIC_APP_URL,
            },
        ];

        if (breadcrumbPage) {
            breadcrumbs.push(breadcrumbPage);
        }
        setBreadcrumbs(breadcrumbs);
    }, [breadcrumbPage]);
};
