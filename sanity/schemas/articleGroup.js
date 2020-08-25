export default {
    name: 'articleGroup',
    title: 'Article Group',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'blockContent',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
            validation: (Rule) => Rule.required(),
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
