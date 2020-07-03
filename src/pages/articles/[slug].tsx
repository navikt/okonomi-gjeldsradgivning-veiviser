import BlockContent from "@sanity/block-content-to-react";
import client from "../../utils/sanity-client";
import {Sidetittel} from "nav-frontend-typografi";

const Article = (props: {title: string; categories: string[]; body}) => {
    const {title = "Missing title", categories, body = []} = props;

    return (
        <article>
            <Sidetittel>{title}</Sidetittel>
            <p>Posted in: {categories.map((category) => category)}</p>
            <BlockContent blocks={body} {...client.config()} />
        </article>
    );
};

Article.getInitialProps = async function (context) {
    const {slug = ""} = context.query;
    return await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]
        {
            title,
            "categories": categories[]->title,
            body
        }`,
        {slug}
    );
};

export default Article;
