export default {
    name: 'linkPanel',
    title: 'Link panel',
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
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
        {
            name: 'buttonText',
            title: 'Button text',
            type: 'string'
        },
        {
            name: 'article',
            title: 'Article',
            type: 'reference',
            to: [
                {
                    type: 'article',
                },
            ],
            validation: (Rule) => Rule.required(),
        },
    ],
};
