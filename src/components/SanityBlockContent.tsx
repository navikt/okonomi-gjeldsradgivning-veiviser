import BlockContent from "@sanity/block-content-to-react";
import client from "../utils/sanity-client";

export const SanityBlockContent = (props: {blocks}) => {
    return <BlockContent blocks={props.blocks} {...client.config()} />;
};
