import { defaultLanguage } from './locale/lang';

export default {
    name: 'linkPanel',
    title: 'Link panel',
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
            name: 'description',
            title: 'Description',
            type: 'localeBlockContent',
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
            type: 'localeString',
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
