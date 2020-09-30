import BlockContent from '@sanity/block-content-to-react';
import client from '../utils/sanity-client';
import Lenke from 'nav-frontend-lenker';
import Link from 'next/link';
import Vimeo from '@u-wave/react-vimeo';

const serializers = {
    types: {
        vimeo: ({ node }) => {
            const { url } = node;
            return <Vimeo responsive video={url} />;
        },
    },
    marks: {
        fileUpload: ({ mark, children }) => {
            const { assetId, extension, originalFilename } = mark;
            return (
                <Lenke href={`/okonomi-og-gjeld/api/download?id=${assetId}.${extension}&dl=${originalFilename}`}>
                    {children}
                </Lenke>
            );
        },
        link: ({ mark, children }) => {
            const { blank, href } = mark;
            return blank ? (
                <Lenke href={href} target="_blank" rel="noopener">
                    {children}
                </Lenke>
            ) : (
                <Lenke href={href}>{children}</Lenke>
            );
        },
        internalLink: ({ mark, children }) => {
            const { slug = {}, type } = mark;
            const href = `/${slug.current}`;
            return (
                <Link href={getFullPathForInternalLink(type, href)}>
                    <a className="lenke">{children}</a>
                </Link>
            );
        },
    },
};

const getFullPathForInternalLink = (type: string, href: string): string => {
    switch (type) {
        case 'article':
            return '/articles' + href;
        case 'articleGroup':
            return '/group' + href;
        default:
            return href;
    }
};

export const SanityBlockContent = (props: { blocks }) => {
    return <BlockContent blocks={props.blocks} serializers={serializers} {...client.config()} />;
};
