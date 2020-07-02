import Head from "next/head";
import {fetchDecoratorParts} from "../utils/dekorator";
import {Sidetittel} from "nav-frontend-typografi";

const Home = (props) => {
    const decoratorHeader = {__html: props.decoratorHeader};
    const decoratorFooterHtml = {__html: props.decoratorFooter};
    const decoratorEnvHtml = {__html: props.decoratorEnv};
    const headTags = [];
    props.scriptTags.forEach((attrs, index) => {
        attrs.key = "props.scriptTags" + index;
        headTags.push(<script {...attrs} />);
    });
    props.linkTags.forEach((attrs, index) => {
        attrs.key = "props.linkTags" + index;
        headTags.push(<link {...attrs} />);
    });

    return (
        <div className="app">
            <div className="container">
                <Head>
                    {headTags}
                    <title>Økonomi- og gjeldsrådgivning</title>
                </Head>

                <div dangerouslySetInnerHTML={decoratorHeader} />

                <main>
                    <Sidetittel>Økonomi- og gjeldsrådgivning</Sidetittel>
                    <p>Her er det noe innhold</p>
                </main>

                <footer className="footer" dangerouslySetInnerHTML={decoratorFooterHtml} />
                <div dangerouslySetInnerHTML={decoratorEnvHtml} />
            </div>
        </div>
    );
};

Home.getInitialProps = async function (context) {
    return await fetchDecoratorParts();
};

export default Home;
