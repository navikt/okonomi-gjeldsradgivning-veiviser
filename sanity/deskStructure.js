import S from '@sanity/desk-tool/structure-builder';
import { ArticlePreview } from './preview/ArticlePreview';
import { FrontpagePreview } from './preview/FrontpagePreview';

export default () =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Frontpage')
                .child(
                    S.editor()
                        .schemaType('frontpage')
                        .documentId('frontpage')
                        .views([S.view.form(), S.view.component(FrontpagePreview).title('Preview')])
                ),
            S.divider(),
            ...S.documentTypeListItems().filter((listItem) => !['frontpage'].includes(listItem.getId())),
        ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
    switch (schemaType) {
        case 'article':
            return S.document().views([S.view.form(), S.view.component(ArticlePreview).title('Preview')]);
        case 'frontpage':
            return S.document().views([S.view.form(), S.view.component(FrontpagePreview).title('Preview')]);
    }
};
