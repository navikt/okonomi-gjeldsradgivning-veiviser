import { Accordion, BodyLong, Ingress, Link as NavDSLink, Title } from '@navikt/ds-react';
import BlockContent from '@sanity/block-content-to-react';
import Vimeo from '@u-wave/react-vimeo';
import Link from 'next/link';
import React from 'react';

import { logAmplitudeEvent } from '../utils/amplitude';
import client from '../utils/sanity-client';

const serializers = {
    types: {
        vimeo: function renderVimeo({ node }) {
            const { url } = node;
            return <Vimeo responsive video={url} />;
        },
        expandedPanel: function renderExpandedPanel({ node }) {
            return (
                <Accordion heading={node.title} open={node.defaultOpen}>
                    <SanityBlockContent blocks={node.body} />
                </Accordion>
            );
        },
        block: function renderBlock({ node, children }) {
            const style = node.style;
            if (style === 'normal') {
                return <BodyLong spacing>{children}</BodyLong>;
            }
            if (style === 'h2') {
                return (
                    <Title level={2} size="m" spacing>
                        {children}
                    </Title>
                );
            }
            if (style === 'h3') {
                return (
                    <Title level={3} size="s" spacing>
                        {children}
                    </Title>
                );
            }
            if (style === 'ingress') {
                return <Ingress spacing>{children}</Ingress>;
            }

            return children;
        },
    },
    marks: {
        fileUpload: function renderFileUpload({ mark, children }) {
            const { slug } = mark;
            return <NavDSLink href={`/okonomi-og-gjeld/api/download/${slug}`}>{children}</NavDSLink>;
        },
        link: function renderLink({ mark, children }) {
            const { blank, href } = mark;
            const handleOnClick = (event) => {
                event.preventDefault();
                logAmplitudeEvent('Trykk på ekstern lenke', {
                    tittel: children[0],
                    href: href,
                });
                window.location.assign(href);
            };
            return blank ? (
                <NavDSLink href={href} onClick={(event) => handleOnClick(event)} target="_blank" rel="noopener">
                    {children}
                </NavDSLink>
            ) : (
                <NavDSLink href={href} onClick={(event) => handleOnClick(event)}>
                    {children}
                </NavDSLink>
            );
        },
        internalLink: function renderInternalLink({ mark, children }) {
            const { slug = {}, type } = mark;
            const href = `/${slug.current}`;
            return (
                <Link href={getFullPathForInternalLink(type, href)}>
                    <a className="navds-link">{children}</a>
                </Link>
            );
        },
    },
};

const getFullPathForInternalLink = (type: string, href: string): string => {
    switch (type) {
        case 'article':
            return '/artikkel' + href;
        default:
            return href;
    }
};

export const SanityBlockContent = (props: { blocks }) => {
    return <BlockContent blocks={props.blocks} serializers={serializers} {...client.config()} />;
};
