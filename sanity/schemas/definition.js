import { defaultLanguage } from './locale/lang';

export default {
    name: 'definition',
    title: 'Definition',
    type: 'document',
    preview: {
        select: {
            title: `terminology.${defaultLanguage.id}`,
        },
    },
    fields: [
        {
            title: 'Terminology',
            name: 'terminology',
            type: 'localeString',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'localeString',
        },
    ],
};
