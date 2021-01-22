import { NextPageContext } from 'next';

export interface Context extends NextPageContext {
    query: {
        slug: string;
    };
}
