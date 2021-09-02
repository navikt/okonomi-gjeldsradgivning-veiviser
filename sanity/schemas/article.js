import { defaultLanguage } from './locale/lang';

export default {
    name: 'article',
    title: 'Article',
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
            type: 'localeString',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'metaDescription',
            title: 'Meta description',
            type: 'localeString',
            description: 'Dette er teksten som vil vises for søkeresultater på eks. Google',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'localeBlockContent',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'migrationComplete',
            title: 'Migrering fullført',
            type: 'boolean',
        },
    ],
};
