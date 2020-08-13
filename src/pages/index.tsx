import Link from 'next/link';
import { Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { FrontPageArticleType, fetchArticlesForFrontpage } from '../utils/sanity-fetch';
import { Layout } from '../components/Layout';

const Home = (props: FrontPageArticleType) => {
    return (
        <Layout title="Økonomi- og gjeldsrådgivning" isFrontPage={true}>
            <Panel className="seksjon-panel">
                <Innholdstittel>Other posts</Innholdstittel>
                {Object.values(props).map((article, index) => (
                    <Link key={index} href="/articles/[slug]" as={`/articles/${article.slug}`}>
                        <a>{article.title}</a>
                    </Link>
                ))}
            </Panel>
        </Layout>
    );
};

Home.getInitialProps = async (context): Promise<FrontPageArticleType> => {
    return await fetchArticlesForFrontpage();
};

export default Home;
