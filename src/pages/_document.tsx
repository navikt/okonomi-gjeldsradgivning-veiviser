import { Components, ENV, fetchDecoratorReact, Props } from '@navikt/nav-dekoratoren-moduler/ssr';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

const decoratorEnv = process.env.DECORATOR_ENV as Exclude<ENV, 'localhost'>;

const decoratorParams: Props = {
    env: decoratorEnv ?? 'prod',
    chatbot: false,
    feedback: false,
};
class CustomDocument extends Document<{ decorator: Components }> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const decorator = await fetchDecoratorReact(decoratorParams);
        return { ...initialProps, decorator };
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

export default CustomDocument;
