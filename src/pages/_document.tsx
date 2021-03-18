import { Components, ENV, fetchDecoratorReact, Props } from '@navikt/nav-dekoratoren-moduler/ssr';
import { NextPageContext } from 'next';
import { RenderPage } from 'next/dist/next-server/lib/utils';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const decoratorEnv = process.env.DECORATOR_ENV as Exclude<ENV, 'localhost'>;

const decoratorParams: Props = {
    env: decoratorEnv ?? 'prod',
    chatbot: false,
    feedback: false,
};
class CustomDocument extends Document<{ decorator: Components }> {
    static async getInitialProps(ctx: DocumentContext) {
        const styledComponentsStylesheet = await renderServersideStyledComponentsStylesheet(ctx);
        const decorator = await fetchDecoratorReact(decoratorParams);
        return { ...styledComponentsStylesheet, decorator };
    }

    render() {
        const { Styles, Scripts, Header, Footer } = this.props.decorator;
        return (
            <Html lang="nb">
                <Head />
                <Styles />
                <Scripts />

                <body>
                    <Header />
                    <Main />
                    <NextScript />
                    <Footer />
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
