import * as React from 'react';
import { WebPreviewWrapper } from './WebPreviewWrapper';

export const ArticlePreview = (ctx: any) => {
    const slug = ctx.document.displayed?.slug?.current;

    if (!slug) {
        return <div>Artikkelen må ha en slug (url) før den kan forhåndsvises</div>;
    }

    return <WebPreviewWrapper url={`/artikkel/${slug}`} />;
};
