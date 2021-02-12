import React from 'react';

const Preview = ({ value }) => (
    <div>
        <div>
        <strong>{value.title}</strong>
        </div>
        {value.body}
    </div>
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