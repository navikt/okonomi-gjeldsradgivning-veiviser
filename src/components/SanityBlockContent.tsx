import BlockContent from '@sanity/block-content-to-react';
import client from '../utils/sanity-client';
import Lenke from 'nav-frontend-lenker';
import Link from 'next/link';
import Vimeo from '@u-wave/react-vimeo';
import { Ingress, Normaltekst, Undertittel, Element } from 'nav-frontend-typografi';
import { logAmplitudeEvent } from '../utils/amplitude';

const serializers = {
    types: {
        vimeo: ({ node }) => {
            const { url } = node;
            return <Vimeo responsive video={url} />;
        },
        block: ({ node, children }) => {
            const style = node.style;
            if (style === 'normal') {
                return <Normaltekst>{children}</Normaltekst>;
            }
            if (style === 'h2') {
                return <Undertittel>{children}</Undertittel>;
            }
            if (style === 'h3') {
                return <Element tag="h3">{children}</Element>;
            }
            if (style === 'ingress') {
                return <Ingress>{children}</Ingress>;
            }

            console.error('unhandled style', node);
            return children;
        },
    },
    marks: {
        fileUpload: ({ mark, children }) => {
            const { slug } = mark;
            return <Lenke href={`/okonomi-og-gjeld/api/download/${slug}`}>{children}</Lenke>;
        },
        link: ({ mark, children }) => {
            const { blank, href } = mark;
            const handleOnClick = (event: any) => {
                event.preventDefault();
                logAmplitudeEvent('Trykk på ekstern lenke', {
                    tittel: children[0],
                    url: href,
                });
                window.location.assign(href);
            };
            return blank ? (
                <Lenke href={href} onClick={(event) => handleOnClick(event)} target="_blank" rel="noopener">
                    {children}
                </Lenke>
            ) : (
                <Lenke href={href} onClick={(event) => handleOnClick(event)}>
                    {children}
                </Lenke>
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
            return '/artikkel' + href;
        case 'articleGroup':
            return '/artikkelgruppe' + href;
        default:
            return href;
    }
};

export const SanityBlockContent = (props: { blocks }) => {
    return <BlockContent blocks={props.blocks} serializers={serializers} {...client.config()} />;
};
