import { Accordion, BodyLong, Heading, Ingress, Link as NavDSLink } from '@navikt/ds-react';
import { PortableText, PortableTextBlockComponent, PortableTextMarkComponent } from '@portabletext/react';
import Vimeo from '@u-wave/react-vimeo';
import Link from 'next/link';
import React from 'react';

import { logAmplitudeEvent } from '../utils/amplitude';
import { Timeline } from './Timeline';

const NormalText: PortableTextBlockComponent = ({ children }) => <BodyLong spacing>{children}</BodyLong>;

const H2: PortableTextBlockComponent = ({ children }) => (
    <Heading level="2" size="medium" spacing>
        {children}
    </Heading>
);

const H3: PortableTextBlockComponent = ({ children }) => (
    <Heading level="3" size="small" spacing>
        {children}
    </Heading>
);

const IngressText: PortableTextBlockComponent = ({ children }) => <Ingress spacing>{children}</Ingress>;

const FileUpload: PortableTextMarkComponent<{ _type: 'fileUpload'; slug: string }> = ({ value, children }) => (
    <NavDSLink href={`/okonomi-og-gjeld/api/download/${value.slug}`}>{children}</NavDSLink>
);

const PortableTextLink: PortableTextMarkComponent<{ _type: 'link'; blank: boolean; href: string }> = ({
    value,
    children,
}) => {
    const handleOnClick = (event) => {
        event.preventDefault();
        logAmplitudeEvent('Trykk på ekstern lenke', {
            tittel: children[0],
            href: value.href,
        });
        window.location.assign(value.href);
    };
    return value.blank ? (
        <NavDSLink href={value.href} onClick={(event) => handleOnClick(event)} target="_blank" rel="noopener">
            {children}
        </NavDSLink>
    ) : (
        <NavDSLink href={value.href} onClick={(event) => handleOnClick(event)}>
            {children}
        </NavDSLink>
    );
};

const InternalLink: PortableTextMarkComponent<{ _type: 'internalLink'; type: string; slug: { current: string } }> = ({
    value,
    children,
}) => {
    const href = `/${value.slug.current}`;
    return (
        <Link href={getFullPathForInternalLink(value.type, href)}>
            <a className="navds-link">{children}</a>
        </Link>
    );
};

const serializers = {
    types: {
        vimeo: ({ value }) => <Vimeo responsive video={value.url} />,
        expandedPanel: ({ value }) => (
            <Accordion>
                <Accordion.Item defaultOpen={value.defaultOpen}>
                    <Accordion.Header>{value.title}</Accordion.Header>
                    <Accordion.Content>
                        <SanityBlockContent blocks={value.body} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        ),
        timeline: ({ value }) => <Timeline elements={value.elements} />,
    },
    block: {
        normal: NormalText,
        h2: H2,
        h3: H3,
        ingress: IngressText,
    },
    marks: {
        fileUpload: FileUpload,
        link: PortableTextLink,
        internalLink: InternalLink,
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
    return <PortableText value={props.blocks} components={serializers} />;
};
