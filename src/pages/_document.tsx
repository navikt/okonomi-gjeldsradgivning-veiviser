import Document, { Html, Head, Main, NextScript } from 'next/document';
import { fetchDecoratorParts, DecoratorParts } from '../utils/dekorator';

interface CustomDocumentProps {
    decoratorParts: DecoratorParts;
}

class CustomDocument extends Document<CustomDocumentProps> {
    static async getInitialProps(context) {
        const initialProps = await Document.getInitialProps(context);
        const decoratorParts = await fetchDecoratorParts();
        return { ...initialProps, decoratorParts };
    }

    render() {
        const { decoratorEnv, decoratorFooter, decoratorHeader, linkTags, scriptTags } = this.props.decoratorParts;
        const headTags = [];

        scriptTags.forEach((attrs, index) => {
            attrs.key = 'props.scriptTags' + index;
            headTags.push(<script {...attrs} />);
        });

        linkTags.forEach((attrs, index) => {
            attrs.key = 'props.linkTags' + index;
            headTags.push(<link {...attrs} />);
        });
        return (
            <Html lang="no">
                <Head>
                    {headTags}
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <body>
                    <div dangerouslySetInnerHTML={{ __html: decoratorHeader }} />
                    <Main />
                    <footer className="footer" dangerouslySetInnerHTML={{ __html: decoratorFooter }} />
                    <NextScript />
                    <div dangerouslySetInnerHTML={{ __html: decoratorEnv }} />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
