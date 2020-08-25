export default {
    name: 'externalLink',
    title: 'External link',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'href',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
    ],
};
