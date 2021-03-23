import { NextPageContext } from 'next';
import { RenderPage } from 'next/dist/next-server/lib/utils';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const styledComponentsStylesheet = await renderServersideStyledComponentsStylesheet(ctx);
        return { ...styledComponentsStylesheet };
    }

    render() {
        return (
            <Html lang="nb">
                <Head />

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
async function renderServersideStyledComponentsStylesheet(ctx: NextPageContext & { renderPage: RenderPage }) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
            });
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        };
    } finally {
        sheet.seal();
    }
}

export default CustomDocument;
