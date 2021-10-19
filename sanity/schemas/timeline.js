import { defaultLanguage } from './locale/lang';

export const timelineElement = {
    name: 'timelineElement',
    title: 'Timeline element',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            validation: (Rule) => Rule.required(),
        },
    ],
};

export const timeline = {
    name: 'timeline',
    title: 'Timeline',
    type: 'object',
    fields: [
        {
            name: 'elements',
            title: 'Elements',
            type: 'array',
            of: [{ type: 'timelineElement' }],
        },
    ],
};
