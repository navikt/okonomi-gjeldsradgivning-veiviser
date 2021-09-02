import { defaultLanguage } from './locale/lang';

export default {
    name: 'frontpage',
    title: 'Frontpage',
    type: 'document',
    preview: {
        select: {
            title: `title.${defaultLanguage.id}`,
        },
    },
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'localeString',
            validation: (Rule) => Rule.required(),
        },
        {
            name: "languages",
            title: "Tilgjengelige språk",
            description: "Disse språkene vil være synlig i språkvelgeren på siden",
            type: "array",
            of: [{type: "string"}],
            options: {
                list: [
                    {title: "Bokmål", value: "nb"},
                    {title: "Nynorsk", value: "nn"},
                    {title: "Engelsk", value: "en"},
                ],
            },
        },
        {
            name: 'metaDescription',
            title: 'Meta description',
            type: 'localeString',
            description: 'Dette er teksten som vil vises for søkeresultater på eks. Google',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'bannerIcon',
            title: 'Banner Icon',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
    ],
};
