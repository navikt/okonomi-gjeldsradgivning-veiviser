import Document, { Head, Html, Main, NextScript } from 'next/document';
class CustomDocument extends Document {
    render() {
        return (
            <Html lang="nb">
                <Head />
                <Main />
                <NextScript />
            </Html>
        );
    }
}

export default CustomDocument;
