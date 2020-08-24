export default {
    name: 'articleGroup',
    title: 'Article Group',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
        {
            name: 'articles',
            title: 'Articles',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'article' }] }],
        },
        {
            name: 'externalLinks',
            title: 'External Links',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'externalLink' }] }],
        },
    ],
};
