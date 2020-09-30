export default {
    name: 'fileUpload',
    title: 'File Upload',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
            validation: (Rule) => Rule.required(),
        },
    ],
};
