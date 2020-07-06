import {Sidetittel} from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import {fetchArticleWithSlug, ArticleType} from "../../utils/sanity-fetch";
import {SanityBlockContent} from "../../components/SanityBlockContent";
import {Context} from "../../types";

const Article = (props: ArticleType) => {
    return (
        <Panel className="seksjon-panel">
            <Sidetittel>{props.title}</Sidetittel>
            <p>Posted in: {props.categories?.map((category) => category)}</p>
            <SanityBlockContent blocks={props.body} />
        </Panel>
    );
};

Article.getInitialProps = async (context: Context): Promise<ArticleType> => {
    return await fetchArticleWithSlug(context.query.slug);
};

export default Article;
