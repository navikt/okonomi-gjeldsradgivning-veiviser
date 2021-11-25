import { Locale } from '@navikt/nav-dekoratoren-moduler';
import { NextPageContext } from 'next';

export interface Context extends NextPageContext {
    query: {
        slug: string;
    };
}

export type Breadcrumb = {
    url: string;
    title: string;
    handleInApp?: boolean;
};

export type Language =
    | {
          url?: string;
          locale: Locale;
          handleInApp: true;
      }
    | {
          url: string;
          locale: Locale;
          handleInApp?: false;
      };
