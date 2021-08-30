import {defaultLanguage} from "../locale/lang";

export default {
    name: 'frontpagePanel',
    title: 'Frontpage Panel',
    type: 'object',
    preview: {
        select: {
            title: `title.${defaultLanguage.id}`,
        },
    },
    fields: [
        {
            name: 'withTitle',
            title: 'With title',
            type: 'boolean',
        },
        {
            name: 'title',
            title: 'Title',
            type: 'localeString',
            hidden: ({parent}) =>  !parent?.withTitle
        },
        {
            name: 'columnLayout',
            title: 'Column Layout',
            description: 'Number of panels in each row',
            type: 'number',
            options: {
                list: [1,2,3]
            },
            validation: (Rule) => Rule.required(),
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