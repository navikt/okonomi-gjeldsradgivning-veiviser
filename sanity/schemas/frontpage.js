export default {
    name: 'frontpage',
    title: 'Frontpage',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'metaDescription',
            title: 'Meta description',
            type: 'string',
            description: 'Dette er teksten som vil vises for søkeresultater på eks. Google',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'bannerIcon',
            title: 'Banner Icon',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'panels',
            title: 'Panels',
            type: 'array',
            of: [
                { type: 'reference', to: [{ type: 'articlePanel' }, { type: 'articleGroup' }, { type: 'linkPanel' }] },
            ],
            validation: (Rule) => Rule.required(),
        },
    ],
};
