import React from 'react';

const Preview = ({ value }) => (
    <>
        <div>
        <strong>{value.title}</strong>
        </div>
        {value.body}
    </>
);

export default {
    name: 'expandedPanel',
    title: 'Expanded Panel',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        },
        {
            name: 'defaultOpen',
            title: 'Open by default',
            type: 'boolean'
        }
    ],
    preview: {
        select: {
            title: 'title',
            body: 'body'
        },
        component: Preview,
    },
};