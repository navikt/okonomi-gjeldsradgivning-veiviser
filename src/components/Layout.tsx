import Head from 'next/head';
import styled from 'styled-components';

import { DecoratorParts } from '../utils/dekorator';
import { DecoratorEnv } from './decorator/DecoratorEnv';
import { DecoratorFooter } from './decorator/DecoratorFooter';
import { DecoratorHeader } from './decorator/DecoratorHeader';
import { PageBanner } from './PageBanner';

const StyledLayout = styled.div`
    background-color: #e9e7e7;

    .decorator-utils-container {
        background-color: #fff;
    }

    .lenke {
        img + span:not(.sr-only),
        span:not(.sr-only) + img {
            margin-left: 0.25em;
        }
    }
`;

const App = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    box-sizing: border-box;
    margin: 4rem 1rem 6rem 1rem;
`;

export const Layout = (props: {
    title: string;
    isFrontPage: boolean;
    bannerIconUrl?: string;
    decoratorParts?: DecoratorParts;
    children: React.ReactChild;
}) => {
    return (
        <StyledLayout>
            <Head>
                {props.decoratorParts?.linkTags.map((attrs, index) => {
                    attrs.key = 'props.linkTags' + index;
                    return <link key={index} {...attrs} />;
                })}
            </Head>
            <DecoratorHeader html={props.decoratorParts?.decoratorHeader} />
            <App className="app" id="app">
                <PageBanner isFrontPage={props.isFrontPage} title={props.title} iconUrl={props.bannerIconUrl} />
                <Content>{props.children}</Content>
            </App>
            <DecoratorFooter html={props.decoratorParts?.decoratorFooter} />
            <DecoratorEnv env={props.decoratorParts?.decoratorEnv} />
        </StyledLayout>
    );
};
