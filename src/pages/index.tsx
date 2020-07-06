import Link from "next/link";
import {Sidetittel, Innholdstittel} from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import {FrontPageArticleType, fetchArticlesForFrontpage} from "../utils/sanity-fetch";

const Home = (props: FrontPageArticleType) => {
    return (
        <>
            <Panel className="seksjon-panel">
                <Sidetittel>Økonomi- og gjeldsrådgivning</Sidetittel>
            </Panel>
            <Panel className="seksjon-panel">
                <Innholdstittel>Other posts</Innholdstittel>
                {Object.values(props).map((article) => (
                    <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                        <a>{article.title}</a>
                    </Link>
                ))}
            </Panel>
            <p>Her er det noe innhold</p>
        </>
    );
};

Home.getInitialProps = async (context): Promise<FrontPageArticleType> => {
    return await fetchArticlesForFrontpage();
};

export default Home;
