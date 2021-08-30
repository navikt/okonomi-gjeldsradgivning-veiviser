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
            name:'useLocalizedFrontpagePanels',
            title: 'Use new panels (In development',
            type: 'boolean',
        },
        {
            name: 'frontpagePanels',
            title: 'Panels',
            type: 'array',
            of: [{type: 'frontpagePanel'}],
            hidden: ({document}) =>  !document?.useLocalizedFrontpagePanels
        }
    ],
};
