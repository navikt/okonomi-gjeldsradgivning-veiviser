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
            description:
                'Alle filer må være på et åpent og tilgjengelig format. Eksempler på filer som kan redigeres er docs, xlsx og pptx.',
            options: {
                accept: '.docx,.xlsx,.pptx',
            },
            validation: (Rule) => Rule.required(),
        },
    ],
};
