import Document, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
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

export default CustomDocument;
