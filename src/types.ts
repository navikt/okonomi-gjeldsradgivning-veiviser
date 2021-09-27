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
          locale: string;
          handleInApp: true;
      }
    | {
          url: string;
          locale: string;
          handleInApp?: false;
      };
