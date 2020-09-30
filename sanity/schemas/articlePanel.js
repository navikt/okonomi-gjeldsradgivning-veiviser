export default {
    name: 'articlePanel',
    title: 'Article Panel',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
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
            validation: (Rule) => Rule.required(),
        },
    ],
};
